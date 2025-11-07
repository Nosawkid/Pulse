import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!auth || !auth.accessToken) {
    return <Navigate to={"/login"} />;
  }

  return typeof children === "function" ? children(auth) : children;
};

export default PrivateRoute;
