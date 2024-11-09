import { Link, useParams } from "react-router-dom";
import { useGetFilteredProductsByBrandQuery } from "@/redux/slices/productsApiSlice";

import ProductList from "@/components/product/card/ProductList";
import NotFound from "@/components/error/NotFound";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

/**
 * BrandsShop component displays products filtered by brand.
 * Uses the brand slug from URL params to fetch data.
 */
const BrandsShop = () => {
  // Extract the brand slug from the URL parameters
  const { slug } = useParams();

  // Fetch products filtered by the brand slug
  const {
    data: brandData,
    error: brandError,
    isLoading: brandIsLoading
  } = useGetFilteredProductsByBrandQuery({ brandSlug: slug });

  return (
    <div className="brands-shop">
      <h3 className="text-uppercase fs-2 fw-bold mb-4">
        Explore&nbsp;&nbsp;&nbsp;
        <Link
          to="/brands"
          className="redirect-link fs-2 mb-5 fw-bold text-uppercase"
        >
          {slug}
        </Link>
      </h3>

      {/* Show loading spinner while fetching data */}
      {brandIsLoading ? (
        <LoadingSpinner />
      ) : // Show not found message if there's an error fetching the brand
      brandError ? (
        <NotFound message="Brand not found" />
      ) : (
        // Display the list of products for the specified brand
        <ProductList products={brandData?.products} />
      )}
    </div>
  );
};

export default BrandsShop;
