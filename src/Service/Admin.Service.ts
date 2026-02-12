import { axiosInstance } from "../lib/axios";
import { handleError } from "./ErrorHandler";

import {
  TOTAL_USERS,
  TOTAL_MENTORS,
  TOTAL_REVENUE,
  PENDING_MENTOR_REQUESTS_COUNT,
  ACTIVE_COLLABORATIONS_COUNT,
  REVENUE_TRENDS,
  USER_GROWTH,
  PENDING_MENTOR_REQUESTS,
  TOP_MENTORS,
  RECENT_COLLABORATIONS,
  ADMIN_DETAILS,
  UPDATE_ADMIN_PROFILE,
} from "../Constant/ApiRoutes/AdminRoutes";

// Stats / Counts
export const getTotalUsersCount = async () => {
  try {
    const response = await axiosInstance.get(TOTAL_USERS);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTotalMentorsCount = async () => {
  try {
    const response = await axiosInstance.get(TOTAL_MENTORS);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTotalRevenue = async () => {
  try {
    const response = await axiosInstance.get(TOTAL_REVENUE);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getPendingMentorRequestsCount = async () => {
  try {
    const response = await axiosInstance.get(PENDING_MENTOR_REQUESTS_COUNT);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getActiveCollaborationsCount = async () => {
  try {
    const response = await axiosInstance.get(ACTIVE_COLLABORATIONS_COUNT);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

// Trends / Analytics
export const getRevenueTrends = async (timeFormat: string, days: string) => {
  try {
    const response = await axiosInstance.get(REVENUE_TRENDS, {
      params: { timeFormat, days },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserGrowth = async (timeFormat: string, days: string) => {
  try {
    const response = await axiosInstance.get(USER_GROWTH, {
      params: { timeFormat, days },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

// Lists / Recent Data
export const getPendingMentorRequests = async (limit?: number) => {
  try {
    const response = await axiosInstance.get(PENDING_MENTOR_REQUESTS, {
      params: limit ? { limit } : undefined,
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTopMentors = async (limit?: number) => {
  try {
    const response = await axiosInstance.get(TOP_MENTORS, {
      params: limit ? { limit } : undefined,
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getRecentCollaborations = async (limit?: number) => {
  try {
    const response = await axiosInstance.get(RECENT_COLLABORATIONS, {
      params: limit ? { limit } : undefined,
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

// Admin Profile

export const getAdminById = async () => {
  try {
    const response = await axiosInstance.get(ADMIN_DETAILS);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateAdminProfile = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put(UPDATE_ADMIN_PROFILE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};