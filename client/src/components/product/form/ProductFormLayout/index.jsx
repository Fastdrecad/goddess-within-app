import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Meta from "@/components/features/Meta";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Message from "@/components/features/Message";
import { Container } from "reactstrap";
import React from "react";

const ProductFormLayout = ({
  title,
  handleSubmit,
  isLoading,
  error,
  submitText,
  submitVariant = "primary",
  children
}) => {
  if (isLoading) {
    return (
      <Row className="align-items-center justify-content-center">
        <LoadingSpinner />
      </Row>
    );
  }

  if (error) {
    return (
      <Message variant="danger">
        {error?.data?.message || "An error occurred"}
      </Message>
    );
  }

  return (
    <Container fluid className={`product-${title.toLowerCase()}-page`}>
      <Meta title={title} />

      {/* Header */}
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <h1>{title}</h1>
        </Col>
        <Col xs={12} md={6} className="text-md-end">
          <Link className="redirect-link" to="/admin/product-list">
            <span>Go Back</span>
          </Link>
        </Col>
      </Row>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Row>
          {/* Form Fields */}
          {React.Children.map(children, (child) => (
            <Col xs={12} md={6} className="mb-4 ">
              {child}
            </Col>
          ))}
        </Row>

        {/* Submit Button */}
        <Row>
          <Col xs={12} className="text-center mt-4">
            <Button
              type="submit"
              variant={submitVariant}
              text={submitText}
              size="md"
              disabled={isLoading}
            />
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default ProductFormLayout;
