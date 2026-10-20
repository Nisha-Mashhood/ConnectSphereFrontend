import axios from "axios";
import axiosRetry from "axios-retry";
import { store } from "../redux/store";
import { signOut } from "../redux/Slice/userSlice";
import toast from "react-hot-toast";
import { InternalAxiosRequestConfig } from "axios";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Configure retry
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => {
    // Don't retry rate limit or cancelled requests
    if (error.response?.status === 429 || axios.isCancel(error)) {
      return false;
    }
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
});

// Track in-flight requests (deduplication)
const pendingRequests = new Map<string, AbortController>();

const getRequestKey = (config: InternalAxiosRequestConfig) => {
  const { method, url, params, data } = config;
  return `${method}-${url}-${JSON.stringify(params || {})}-${JSON.stringify(
    data || {}
  )}`;
};

// Force logout helper
const forceLogout = (navigate: (path: string) => void) => {
  store.dispatch(signOut());

  // Clear storage
  localStorage.clear();
  sessionStorage.clear();

  // Best-effort cookie clear
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });

  toast.error("Session expired. Please login again.");
  navigate("/login");
};

export const setupInterceptors = (navigate: (path: string) => void) => {
  // ========== REQUEST INTERCEPTOR ==========
  axiosInstance.interceptors.request.use(
    (config) => {
      const requestKey = getRequestKey(config);

      // Cancel previous identical request
      if (pendingRequests.has(requestKey)) {
        const controller = pendingRequests.get(requestKey);
        controller?.abort();
      }

      const controller = new AbortController();
      pendingRequests.set(requestKey, controller);
      config.signal = controller.signal;

      return config;
    },
    (error) => Promise.reject(error)
  );

  // ========== RESPONSE INTERCEPTOR ==========
  axiosInstance.interceptors.response.use(
    (response) => {
      // Clean up pending request
      const requestKey = getRequestKey(response.config);
      pendingRequests.delete(requestKey);
      return response;
    },
    async (error) => {
      // Clean up pending request on error
      if (error?.config) {
        try {
          const requestKey = getRequestKey(error.config);
          pendingRequests.delete(requestKey);
        } catch {
          // ignore
        }
      }

      // Cancelled request
      if (axios.isCancel(error)) {
        console.warn("Request cancelled - previous request was still pending");
        return Promise.reject(error);
      }

      // Rate limit
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.", {
          duration: 3000,
        });
        return Promise.reject(error);
      }

      // Blocked user
      if (
        error.response?.status === 403 &&
        error.response.data?.message === "Blocked"
      ) {
        toast.error("Your account has been blocked. Please contact support.");
        forceLogout(navigate);
        return Promise.reject(error);
      }

      const originalRequest = error.config;

      // ========== 401 HANDLING (Access Token expired / missing) ==========
      if (error.response?.status === 401 && !originalRequest._retry) {
        // Don't try to refresh the refresh-token endpoint itself
        if (originalRequest.url?.includes("/auth/refresh-token")) {
          forceLogout(navigate);
          return Promise.reject(error);
        }

        if (isRefreshing) {
          // Already refreshing → queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => axiosInstance(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Try to get a new access token using the refresh token cookie
          await axiosInstance.post(
            "/auth/refresh-token",
            {},
            { withCredentials: true }
          );

          // Refresh succeeded → process queued requests
          processQueue(null);

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed → force logout
          processQueue(refreshError);
          forceLogout(navigate);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Any other error
      return Promise.reject(error);
    }
  );
};