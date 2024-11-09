import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup, Card } from "react-bootstrap";

import Meta from "@/components/features/Meta";
import Message from "@/components/features/Message";
import CartItem from "@/components/cart/CartItem";
import Button from "@/components/ui/Button";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/constants/cart";

const CartPage = () => {
  const navigate = useNavigate();

  // Retrieve cart and wishlist items from Redux store
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const shipping = cartItems.length === 0 ? 0 : SHIPPING_COST;

  // Calculate subtotal based on cart items
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
    [cartItems]
  );

  // Calculate total cost including VAT and potential free shipping
  const totalVAT = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return subtotal > FREE_SHIPPING_THRESHOLD ? subtotal : subtotal + shipping;
  }, [subtotal, shipping, cartItems.length]);

  // Add and remove page-specific CSS class for styling
  useEffect(() => {
    document.body.classList.add("cart-page");
    return () => document.body.classList.remove("cart-page");
  }, []);

  // Navigate to login with redirect to shipping if user proceeds to checkout
  const handleCheckout = () => {
    // Navigate to login page with redirect to shipping after authentication
    navigate("/login?redirect=/shipping");
  };

  // Render cart items from the cart state
  const renderCartItems = () =>
    cartItems?.map((item) => (
      <CartItem key={item._id} item={item} wishlistItems={wishlistItems} />
    ));

  return (
    <div className="cart-shop">
      <Meta title="Goddess within" />
      <Row className="row-lg">
        {/* Cart Items Section */}
        <Col md={8}>
          <div className="bag-content">
            <h1 className="m-0 my-4 my-sm-3">
              Your Bag{" "}
              {cartItems.length < 1
                ? "is Empty"
                : cartItems.length === 1
                  ? `(${cartItems.length} item)`
                  : `(${cartItems.length} items)`}
            </h1>
            {cartItems.length === 0 ? (
              <Message className="btn border-2 mt-sm-5 mt-lg-3 mb-5 btn-outline-dark btn-no-radius secondary">
                Your Bag is empty -{" "}
                <Link to="/shop" className="fw-bold text-decoration-underline">
                  {" "}
                  Back to Shop
                </Link>
              </Message>
            ) : (
              <>
                <p className="fw-medium">
                  Parcel will be delivered by GODDESS WITHIN
                </p>
                <div className="item-info">
                  <div className="item-container">{renderCartItems()}</div>
                </div>
              </>
            )}
          </div>
        </Col>

        {/* Order Summary Section */}
        <Col md={4}>
          <Card className="border-0 rounded-0">
            <ListGroup variant="flush" className="pt-2">
              <ListGroup.Item>
                <h1 className="m-0 my-5 my-sm-2">Order Summary</h1>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Subtotal</Col>
                  <Col className="text-end">{subtotal.toFixed(2)} €</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col className="text-end">
                    {cartItems.length === 0
                      ? "0"
                      : subtotal > FREE_SHIPPING_THRESHOLD
                        ? "0"
                        : SHIPPING_COST}{" "}
                    €
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col className="fw-bold fs-6">Total (VAT included)</Col>
                  <Col className="text-end fw-bold fs-6">
                    {totalVAT.toFixed(2)} €
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  variant="danger"
                  text="Checkout Now"
                  size="lg"
                  className="checkout"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
