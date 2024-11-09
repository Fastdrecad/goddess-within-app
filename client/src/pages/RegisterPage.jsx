import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useRegisterMutation } from "@/redux/slices/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const RegisterPage = () => {
  // State variables for user input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Register mutation for handling API request
  const [register, { isLoading }] = useRegisterMutation();

  // Get user info from Redux store to check if already logged in
  const { userInfo } = useSelector((state) => state.auth);

  // Check for redirect path from URL parameters
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // Redirect logged-in users to the specified route or home
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate matching passwords
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        // Register user and update auth state
        const res = await register({
          email,
          password,
          firstName,
          lastName
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <div className="signup-form">
      {/* Display loading spinner if registration is in progress */}
      {isLoading && (
        <Row className="align-items-center justify-content-center">
          <LoadingSpinner />
        </Row>
      )}
      <form onSubmit={handleSubmit}>
        <Row className="align-items-center justify-content-center">
          <Col xs={{ size: 12, order: 2 }} md={{ size: "6", order: 1 }}>
            <h2 style={{ textAlign: "left" }} className="heading-register">
              Create an account
            </h2>
            {/* User input fields */}
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

            {/* Terms and Conditions */}
            <p className="policy">
              By registering for an account, you agree to our{" "}
              <b>Terms of Use</b>. Please read our <b>Privacy Notice</b>.
            </p>
            <hr />

            {/* Submit button */}
            <Button
              type="submit"
              variant="primary"
              text="Register"
              size="lg"
              disabled={isLoading}
            />

            {/* Link to login page */}
            <div className="input-box">
              <Link className="redirect-link" to="/login">
                <span>Back to login</span>
              </Link>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default RegisterPage;
