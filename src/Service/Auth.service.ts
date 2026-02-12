import { axiosInstance } from "../lib/axios";
import { OtpPurpose } from "../redux/types";
import { handleError } from "./ErrorHandler";

// Import routes
import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  GOOGLE_SIGNUP,
  GOOGLE_LOGIN,
  GITHUB_SIGNUP,
  GITHUB_LOGIN,
  RESEND_OTP,
  VERIFY_OTP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CHECK_PROFILE,
  PROFILE_DETAILS,
  UPDATE_USER_DETAILS,
  VERIFY_ADMIN_PASSKEY,
} from "../Constant/ApiRoutes/AuthRoutes";
import { SignupFormValues } from "../validation/signUpValidation";
import { LoginFormApiValues } from "../validation/loginValidation";

// Core Auth
export const register = async (data: SignupFormValues) => {
  try {
    const response = await axiosInstance.post(SIGNUP, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const login = async (data: LoginFormApiValues) => {
  try {
    const response = await axiosInstance.post(LOGIN, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const logout = async (email: string) => {
  try {
    const response = await axiosInstance.post(LOGOUT, { email });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

// Social Auth
export const googleSignup = async (code: string) => {
  try {
    const response = await axiosInstance.post(GOOGLE_SIGNUP, { code });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const googleLogin = async (code: string) => {
  try {
    const response = await axiosInstance.post(GOOGLE_LOGIN, { code });
    return response.data.data;
  } catch (error) {
    console.error("Google Login Error:", error);
    handleError(error);
  }
};

export const githubSignup = async (code: string) => {
  try {
    const response = await axiosInstance.post(GITHUB_SIGNUP, { code });
    return response.data.data;
  } catch (error) {
    if (error.response?.data?.message === "Email already registered.") {
      throw new Error("Email already registered. Please login instead.");
    }
    console.error("GitHub Signup Error:", error);
    throw error;
  }
};

export const githubLogin = async (code: string) => {
  try {
    const response = await axiosInstance.post(GITHUB_LOGIN, { code });
    return response.data.data;
  } catch (error) {
    console.error("GitHub Login Error:", error);
    throw error;
  }
};

// OTP & Verification
export const resendOTP = async (data: { otpId: string; purpose: OtpPurpose }) => {
  try {
    const response = await axiosInstance.post(RESEND_OTP, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const verifyOTP = async (data) => {
  try {
    const response = await axiosInstance.post(VERIFY_OTP, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Password Management
export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post(FORGOT_PASSWORD, { email });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const resetPassword = async (data: { newPassword:string, confirmPassword: string }) => {
  try {
    await axiosInstance.post(RESET_PASSWORD, data);
  } catch (error) {
    handleError(error);
  }
};

export const adminPasscodeCheck = async (passkey: string) => {
  try {
    const response = await axiosInstance.post(VERIFY_ADMIN_PASSKEY, { passkey });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};


// User Profile
export const checkProfile = async () => {
  try {
    const response = await axiosInstance.get(CHECK_PROFILE);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await axiosInstance.get(PROFILE_DETAILS(userId));
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserDetails = async (userId: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      UPDATE_USER_DETAILS(userId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};