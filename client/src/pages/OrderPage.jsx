import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Col, Row, Card, Image, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation
} from "@/redux/slices/ordersApiSlice";

import Message from "@/components/features/Message";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";

const OrderPage = () => {
  const { id: orderId } = useParams();

  // Fetch order details and track loading/error states
  const {
    data: order,
    refetch,
    isLoading,
    error
  } = useGetOrderDetailsQuery(orderId);

  // Mutations for handling order payment and delivery
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  // PayPal script reducer for managing the PayPal button's loading state
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Fetch PayPal client ID
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  // Load PayPal script when order is unpaid and client ID is available
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "EUR"
          }
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, errorPayPal, loadingPayPal, paypalDispatch]);

  // Handle PayPal approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment successful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  };

  // Handle PayPal error
  const onError = (err) => {
    toast.error(err.message);
  };

  // Create PayPal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice }
          }
        ]
      })
      .then((orderID) => orderID);
  };

  // Mark the order as delivered
  const handleDeliverOrder = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Row className="align-items-center justify-content-center">
      <LoadingSpinner />
    </Row>
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="two-line-ellipsis">
      <Row>
        <h1>
          Order: <span className="fw-bold fs-7">{order._id}</span>
        </h1>

        {/* Left Column: Shipping, Payment, and Order Items */}
        <Col md={8} className="mb-3">
          <ListGroup variant="flush">
            {/* Shipping Information */}
            <ListGroup.Item className="p-0">
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {`${order.user.firstName.charAt(0).toUpperCase() + order.user.firstName.slice(1)} ${order.user.lastName.charAt(0).toUpperCase() + order.user.lastName.slice(1)}`}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            {/* Payment Information */}
            <ListGroup.Item className="p-0 my-4">
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item className="p-0">
              <h2>Order Items</h2>
              {order.orderItems.map((item, i) => (
                <ListGroup.Item key={i}>
                  <Row className="align-items-center">
                    <Col md={1} className="p-0">
                      <Image src={item.images[0].url} alt={item.name} fluid />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`} className="fw-bold">
                        {item.name}
                      </Link>
                      <h6 className="m-0">Size: {item?.size}</h6>
                      <h6 className="m-0">Qty: {item?.qty}</h6>
                    </Col>
                    <Col md={4} className="text-end">
                      {item.qty} x {item.price}€ = {item.qty * item.price}€
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Right Column: Order Summary and Payment/Delivery Actions */}
        <Col md={4}>
          <Card className="rounded-0">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="fs-4 m-0">Order Summary</h2>
              </ListGroup.Item>

              {/* Summary of items, shipping, and tax costs */}
              <ListGroup.Item className="fs-7">
                <Row className="py-1">
                  <Col>Items</Col>
                  <Col className="text-end">{order.itemsPrice}€</Col>
                </Row>
                <Row className="py-1">
                  <Col>Shipping</Col>
                  <Col className="text-end">{order.shippingPrice}€</Col>
                </Row>
                <Row className="py-1">
                  <Col>Tax</Col>
                  <Col className="text-end">{order.taxPrice}€</Col>
                </Row>
                <Row className="py-1">
                  <Col className="fw-bold fs-6">Total</Col>
                  <Col className="fw-bold text-end fs-6">
                    {order.totalPrice}€
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* PayPal Payment Button for unpaid orders */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <LoadingSpinner />}
                  {isPending ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="my-3">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {/* Mark as Delivered button for admins */}
              {userInfo &&
                userInfo.role === "ROLE ADMIN" &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      onClick={handleDeliverOrder}
                      variant="danger"
                      text="Mark As Delivered"
                      size="lg"
                    />
                  </ListGroup.Item>
                )}

              {loadingDeliver && <LoadingSpinner />}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
