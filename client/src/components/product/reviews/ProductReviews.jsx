import { useState } from "react";
import { Form, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateReviewMutation } from "@/redux/slices/productsApiSlice";

import Message from "@/components/features/Message";
import Button from "@/components/ui/Button";
import Rating from "@/components/widgets/Rating";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ProductReviews = ({ product, refetch }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId: product._id,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <h2 className="h1 mt-4 text-center">Reviews</h2>
      {product.reviews.length === 0 && <Message>No Reviews</Message>}

      <ListGroup variant="flush">
        {/* Existing Reviews */}
        {product.reviews.map((review) => (
          <ListGroup.Item key={review._id}>
            <strong>{review.name}</strong>
            <Rating value={review.rating} />
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
          </ListGroup.Item>
        ))}

        {/* Review Form */}
        <ListGroup.Item className="p-0">
          <h2 className="mt-4">Write a Customer Review</h2>

          {loadingProductReview && (
            <Row className="align-items-center justify-content-center">
              <LoadingSpinner />
            </Row>
          )}

          {userInfo ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-2" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  className="rounded-0 border-black"
                  as="select"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="my-3" controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  className="rounded-0 border-black"
                  as="textarea"
                  row="3"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                text="Submit"
                size="lg"
                type="submit"
                disabled={loadingProductReview}
                className="mb-5"
              />
            </Form>
          ) : (
            <Message>
              Please <Link to="/login">sign in</Link> to write a review
            </Message>
          )}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default ProductReviews;
