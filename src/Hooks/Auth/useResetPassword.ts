import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { clearForgotOtpVerified, clearResetEmail, signinFailure, signinStart, clearResetToken } from "../../redux/Slice/userSlice";
import { resetPassword } from "../../Service/Auth.service";
import { ResetPasswordFormValues } from "../../validation/resetPasswordValidation";

export function useResetPassword() {
  const { isForgotOtpVerified, resetEmail, resetToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!resetEmail) return;
  if (!isForgotOtpVerified || !resetEmail) {
    navigate("/forgot");
  }
}, [isForgotOtpVerified, navigate, resetEmail]);

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      if (!resetToken) {
        toast.error("Session expired. Please verify OTP again.");
        navigate("/forgot");
        return;
      }
      dispatch(signinStart());
      const data = { newPassword: values.newPassword, confirmPassword: values.confirmPassword };
      await resetPassword(data, resetToken);
      toast.success("Password reset successfully!");
      navigate("/login");
      setTimeout(() => {
        dispatch(clearForgotOtpVerified());
        dispatch(clearResetEmail());
        dispatch(clearResetToken());
      }, 0);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Password reset failed";
      toast.error("Password reset failed");
      dispatch(signinFailure(errorMessage));
      console.log("Reset Password Error: ", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleResetPassword, isLoading, resetEmail };
}