import { Row } from "react-bootstrap";

import ProductList from "@/components/product/card/ProductList";
import NotFound from "@/components/error/NotFound";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ProductsShop = ({ products, isLoading, error }) => {
  return (
    <div className="products-shop">
      {isLoading ? (
        <Row className="align-items-center justify-content-center">
          <LoadingSpinner />
        </Row>
      ) : error ? (
        <NotFound message="Products not found" />
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default ProductsShop;
