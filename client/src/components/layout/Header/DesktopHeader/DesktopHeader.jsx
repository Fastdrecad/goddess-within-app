import { Link } from "react-router-dom";
import { Col, Container, Navbar, Row } from "reactstrap";

import {
  AdminProfileIcon,
  BrandLogo,
  CartIcon,
  NavItemBrand,
  SearchBox,
  UserProfileIcon,
  WishlistIcon
} from "@/components/layout/Header/components";

const DesktopHeader = ({ productsData, toggleCart }) => {
  return (
    <Container className="d-none d-lg-block">
      <Row className="align-items-center top-header">
        {/* Brand Logo */}
        <Col lg={{ size: 2, order: 1 }} className="">
          <BrandLogo />
        </Col>

        {/* Search Box */}
        <Col lg={{ size: 4, order: 2 }} className="">
          <SearchBox data={productsData} />
        </Col>

        {/* Navbar */}
        <Col lg={{ size: 6, order: 3 }} className="">
          <Navbar
            color="light"
            light
            expand="sm"
            className="mb-sm-0 mt-sm-2 mt-md-0 mb-lg-0 "
          >
            <div className="header-content justify-content-end">
              <div className="shop-brands-container">
                <div className="shop-text">
                  <Link to="/shop">Shop</Link>
                </div>
                <NavItemBrand />
              </div>

              <div className="profile-icons">
                <WishlistIcon />
                <CartIcon toggleCart={toggleCart} />
                <UserProfileIcon />
                <AdminProfileIcon />
              </div>
            </div>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default DesktopHeader;
