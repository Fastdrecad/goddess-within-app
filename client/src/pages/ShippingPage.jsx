import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { saveShippingAddress } from "@/redux/slices/cartSlice";

import FormContainer from "@/components/forms/FormContainer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";

const ShippingPage = () => {
  // Access shipping address from Redux store if previously saved
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // State variables for form fields, initialized with stored values if available
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission to save shipping address and proceed to payment
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      {/* Display checkout steps navigation */}
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>

      {/* Shipping address form */}
      <form onSubmit={handleSubmit}>
        <Row className="align-items-center justify-content-center">
          <Col xs="12" md="12">
            <Input
              id="address"
              type="text"
              label="Address*"
              name="address"
              placeholder="Enter address"
              value={address}
              onInputChange={(e) => setAddress(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="city"
              type="text"
              label="City*"
              name="city"
              placeholder="Enter City"
              value={city}
              onInputChange={(e) => setCity(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="postalCode"
              type="text"
              label="Postal Code*"
              name="postalCode"
              placeholder="Enter Postal Code"
              value={postalCode}
              onInputChange={(e) => setPostalCode(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="country"
              type="text"
              label="Country*"
              name="country"
              placeholder="Enter Country"
              value={country}
              onInputChange={(e) => setCountry(e.target.value)}
            />
          </Col>
        </Row>

        {/* Submit button to continue to payment step */}
        <Button
          type="submit"
          variant="primary"
          text="Continue"
          size="lg"
          className="my-4"
        />
      </form>
    </FormContainer>
  );
};

export default ShippingPage;
