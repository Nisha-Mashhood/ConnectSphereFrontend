import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useSelector((state: RootState) => state.user); 

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};