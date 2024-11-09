import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import { useLoginMutation } from "@/redux/slices/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  // Extract 'redirect' query parameter or default to home page
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // Redirect if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect); // Navigate after successful login
    } catch (err) {
      // Display error message using toast notifications
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div className="signup-form">
      {/* Show loading spinner while login is in progress */}
      {isLoading && (
        <Row className="align-items-center justify-content-center">
          <LoadingSpinner />
        </Row>
      )}
      <form onSubmit={handleSubmit}>
        <Row className="align-items-center justify-content-center">
          <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }}>
            <h2 style={{ textAlign: "left" }} className="heading-register">
              Welcome back
            </h2>
            {/* Email Input */}
            <Col xs="12" md="12">
              <Input
                id={"email"}
                type={"text"}
                label={"Email Address*"}
                name={"email"}
                placeholder={"Email address"}
                value={email}
                onInputChange={(e) => setEmail(e.target.value)}
              />
            </Col>

            {/* Password Input */}
            <Col xs="12" md="12">
              <Input
                id={"password"}
                type={"password"}
                label={"Password*"}
                name={"password"}
                placeholder={"Password"}
                value={password}
                onInputChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <p className="policy">
              By registering for an account, you agree to our{" "}
              <b>Terms of Use</b>. Please read our <b>Privacy Notice</b>.
            </p>
            <hr />

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              text="Login"
              size="lg"
              disabled={isLoading}
            />

            {/* Links for password recovery and registration */}
            <div className="d-flex flex-column my-5 gap-3 align-items-md-baseline justify-content-between">
              <Link
                className="redirect-link"
                to="/"
                style={{ fontSize: "16px" }}
              >
                <span>Forgotten your password?</span>
              </Link>
              <Link
                className="redirect-link"
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                style={{ fontSize: "16px" }}
              >
                <span>Create a new account</span>
              </Link>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default LoginPage;
