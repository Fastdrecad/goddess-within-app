import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * PrivateRoute component to restrict access to authenticated users only.
 * Redirects unauthenticated users to the login page.
 */
const PrivateRoute = () => {
  // Access user authentication status from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // If the user is authenticated, render the requested route; otherwise, redirect to login
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
