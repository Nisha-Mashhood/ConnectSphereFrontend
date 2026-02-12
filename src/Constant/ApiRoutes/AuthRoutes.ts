export const AUTH_BASE = '/auth';

// Authentication
export const SIGNUP = `${AUTH_BASE}/signup`;
export const LOGIN = `${AUTH_BASE}/login`;
export const LOGOUT = `${AUTH_BASE}/logout`;
export const GOOGLE_SIGNUP = `${AUTH_BASE}/google-signup`;
export const GOOGLE_LOGIN = `${AUTH_BASE}/google-login`;
export const GITHUB_SIGNUP = `${AUTH_BASE}/github-signup`;
export const GITHUB_LOGIN = `${AUTH_BASE}/github-login`;

// OTP & Verification
export const RESEND_OTP = `${AUTH_BASE}/resend-otp`;
export const VERIFY_OTP = `${AUTH_BASE}/verify-otp`;

// Password Recovery
export const FORGOT_PASSWORD = `${AUTH_BASE}/forgot-password`;
export const RESET_PASSWORD = `${AUTH_BASE}/reset-password`;
export const VERIFY_ADMIN_PASSKEY = `${AUTH_BASE}/verify-admin-passkey`;

// Profile
export const CHECK_PROFILE = (userId: string) => `${AUTH_BASE}/check-profile/${userId}`;
export const PROFILE_DETAILS = (userId: string) => `${AUTH_BASE}/profiledetails/${userId}`;
export const UPDATE_USER_DETAILS = (userId: string) => `${AUTH_BASE}/updateUserDetails/${userId}`;