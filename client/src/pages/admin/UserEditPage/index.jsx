import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useGetUserQuery,
  useUpdateUserMutation
} from "@/redux/slices/usersApiSlice";

import Message from "@/components/features/Message";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import UserForm from "./components/UserForm";

const UserEditPage = () => {
  // Get user ID from route parameters
  const { id: userId } = useParams();
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: ""
  });

  // Fetch user data and track loading/error states
  const { data: user, isLoading, error, refetch } = useGetUserQuery(userId);

  // Mutation for updating user data
  const [updateUser] = useUpdateUserMutation();

  // Populate form data when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.role || "ROLE_MEMBER"
      });
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, formData }).unwrap();
      toast.success("User updated successfully");
      refetch(); // Refetch to update any dependent data
      navigate("/admin/userlist"); // Redirect to user list after successful update
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Row className="align-items-center justify-content-center">
        <LoadingSpinner />
      </Row>
    );
  }

  // Error state
  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }

  return (
    <div className="user-edit-page">
      {/* Back to user list link */}
      <PageHeader />
      {/* User edit form */}
      <UserForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

// Page header component for the "Go Back" link
const PageHeader = () => (
  <div className="input-box">
    <Link className="redirect-link" to="/admin/userlist">
      <span>Go Back</span>
    </Link>
  </div>
);

export default UserEditPage;
