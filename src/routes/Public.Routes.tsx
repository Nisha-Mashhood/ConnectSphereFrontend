import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isAdmin } = useSelector((state: RootState) => state.user);

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};