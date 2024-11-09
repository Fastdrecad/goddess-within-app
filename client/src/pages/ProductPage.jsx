import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "@/redux/slices/productsApiSlice";

import Message from "@/components/features/Message";
import Meta from "@/components/features/Meta";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  ProductDetails,
  ProductGallery,
  ProductReviews
} from "@/components/product";

const ProductPage = () => {
  const { id: productId } = useParams();
  const [selectedImg, setSelectedImg] = useState(0);

  // Fetch product data based on the productId from the URL
  const {
    data: product,
    isLoading,
    refetch,
    error
  } = useGetProductQuery(productId);

  return (
    <div className="product-shop">
      {/* Link to navigate back to the main shop page */}
      <div className="mb-3">
        <Link className="redirect-link" to="/shop">
          <span>Back to Shop</span>
        </Link>
      </div>

      {isLoading ? (
        // Show loading spinner while fetching product data
        <Row className="align-items-center justify-content-center">
          <LoadingSpinner />
        </Row>
      ) : error ? (
        // Display error message if there's an error fetching the product
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* Set meta title for SEO purposes */}
          <Meta
            title={product.name
              .toLowerCase()
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          />
          <Row className="flex-row">
            {/* Product Image Gallery */}
            <Col xs="12" md="6" lg="6">
              <ProductGallery
                product={product}
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
              />
            </Col>

            {/* Product Details and Add-to-Cart Options */}
            <Col xs="12" md="6" lg="6">
              <ProductDetails product={product} />
            </Col>
          </Row>

          <ProductReviews product={product} refetch={refetch} />
        </>
      )}
    </div>
  );
};

export default ProductPage;
