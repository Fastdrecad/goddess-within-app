import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  useLogoutMutation,
  useProfileMutation
} from "@/redux/slices/usersApiSlice";
import { logout, setCredentials } from "@/redux/slices/authSlice";
import { resetCart } from "@/redux/slices/cartSlice";
import { clearAllWishlistItems } from "@/redux/slices/wishlistSlice";
import { useGetMyOrdersQuery } from "@/redux/slices/ordersApiSlice";

import Meta from "@/components/features/Meta";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Message from "@/components/features/Message";
import TableOrders from "@/components/tables/TableOrders";

const ProfilePage = () => {
  // Form fields for user profile data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // Handle user logout: clear cart, wishlist, and navigate to login
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      dispatch(clearAllWishlistItems());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo?.role === "ROLE ADMIN";

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error, refetch } = useGetMyOrdersQuery();

  // Initialize form fields with user information on load
  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  // Handle form submission for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          firstName,
          lastName,
          email,
          password
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
        refetch(); // Refresh orders after profile update
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row>
      <Meta title={isAdmin ? "Admin Profile" : "User Profile"} />
      <Col md={3}>
        <div className="user-profile">
          {userInfo && (
            <div className="profileTab-logout justify-content-start p-0 mb-3">
              <NavLink to="/login" type="button" onClick={logoutHandler}>
                <span>
                  Not{" "}
                  {userInfo.firstName.charAt(0).toUpperCase() +
                    userInfo.firstName.slice(1)}
                  ? Log out
                </span>
              </NavLink>
            </div>
          )}
        </div>
        <h1>{isAdmin ? "Admin Profile" : "User Profile"}</h1>

        {/* Profile Update Form */}
        <form onSubmit={handleSubmit}>
          <Col xs="12" md="12">
            <Input
              id="firstName"
              type="text"
              label="First Name*"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onInputChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="lastName"
              type="text"
              label="Last Name*"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onInputChange={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="email"
              type="text"
              label="Email Address*"
              name="email"
              placeholder="Email address"
              value={email}
              onInputChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="password"
              type="password"
              label="Password*"
              name="password"
              placeholder="Password"
              value={password}
              onInputChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password*"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onInputChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Col>
          <Button
            type="submit"
            variant="primary"
            text="Update"
            size="lg"
            className="my-3"
          />
          {loadingUpdateProfile && (
            <Row className="align-items-center justify-content-center">
              <LoadingSpinner />
            </Row>
          )}
        </form>
      </Col>

      {/* Orders Section */}
      <Col md={9}>
        <h1>My Orders</h1>
        {isLoading ? (
          <Row className="align-items-center justify-content-center">
            <LoadingSpinner />
          </Row>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <TableOrders orders={orders} />
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
