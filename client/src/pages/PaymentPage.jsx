import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Col } from "react-bootstrap";

import { savePaymentMethod } from "@/redux/slices/cartSlice";

import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import Button from "@/components/ui/Button";
import FormContainer from "@/components/ui/FormContainer";

const PaymentPage = () => {
  // State to track the selected payment method, defaulting to "Paypal"
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the cart from Redux store to check if shipping address exists
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Redirect to shipping page if shipping address is not set
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  // Handle form submission to save payment method and proceed to place order
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      {/* Display checkout steps navigation */}
      <CheckoutSteps step1 step2 step3 />
      <h1 className="my-5">Payment Method</h1>

      {/* Payment method selection form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            {/* Radio button for PayPal or Credit Card */}
            <Form.Check
              type="radio"
              className="my-4"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Continue button to proceed to the place order page */}
        <Button
          type="submit"
          variant="primary"
          text="Continue"
          size="lg"
          className="my-2"
        />
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
