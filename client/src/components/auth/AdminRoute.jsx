import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * AdminRoute component to restrict access to users with admin privileges.
 * Redirects non-admin users to the login page.
 */
const AdminRoute = () => {
  // Access user authentication status and role from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // If the user is authenticated and has an admin role, render the requested route; otherwise, redirect to login
  return userInfo && userInfo.role === "ROLE ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
