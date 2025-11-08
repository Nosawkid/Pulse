import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!auth || !auth.accessToken) {
    return <Navigate to={"/login"} />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to={"/unauthorized"} />;
  }
  return typeof children === "function" ? children(auth) : children;
};

export default PrivateRoute;
