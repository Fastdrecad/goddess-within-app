import { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCreateOrderMutation } from "@/redux/slices/ordersApiSlice";
import { clearCartItems } from "@/redux/slices/cartSlice";

import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import Message from "@/components/features/Message";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  // Redirect to appropriate step if shipping or payment details are missing
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  // Handle placing the order
  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap();

      // Clear cart items after placing the order
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {/* Display checkout steps navigation */}
      <CheckoutSteps step1 step2 step3 step4 />

      {/* Main content: Left column for order details, right column for summary */}
      <Row>
        {/* Left Column: Shipping, Payment, and Order Items */}
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className="mt-4">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/product/${item.product}`}
                      className="mb-3 pb-2 border-bottom"
                    >
                      <ListGroup.Item className="p-0 pe-2 border-0">
                        <Row className="align-items-center">
                          <Col md={2}>
                            <Image
                              src={item.images[0].url}
                              alt={item.name}
                              fluid
                            />
                          </Col>
                          <Col>
                            <h5 className="mt-3 one-line-ellipsis fw-medium">
                              {item.name}
                            </h5>
                            <h6>Size: {item?.size}</h6>
                            <h6>{item?.description[0]?.material}</h6>
                          </Col>
                          <Col md={6}>
                            <p className="text-end fw-bold">
                              {item.qty} x {item.price}€ ={" "}
                              {(item.qty * item.price).toFixed(2)}€
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </Link>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Right Column: Order Summary */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col className="text-end">{cart.itemsPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col className="text-end">{cart.shippingPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col className="text-end">{cart.taxPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="fw-bold fs-6">Total</Col>
                  <Col className="fw-bold fs-6 text-end">
                    {cart.totalPrice}€
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Error message if order creation fails */}
              <ListGroup.Item>
                {error && (
                  <Message variant="danger">
                    {error?.data?.message || error.error}
                  </Message>
                )}
              </ListGroup.Item>

              {/* Place Order Button */}
              <ListGroup.Item>
                <Button
                  type="button"
                  variant="danger"
                  text="Place Order"
                  size="lg"
                  className="checkout"
                  disabled={cart.cartItems.length === 0}
                  onClick={handlePlaceOrder}
                />

                {isLoading && (
                  <Row className="align-items-center justify-content-center">
                    <LoadingSpinner />
                  </Row>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
