import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import FeaturedProducts from "@/components/features/FeaturedProducts";
import Meta from "@/components/features/Meta";
import ProductCard from "@/components/product/card/ProductCard";

const WishListPage = () => {
  // Access wishlist items and user information from the Redux store
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="wishlist-page">
      {/* Only display content if user is logged in */}
      {userInfo && (
        <>
          <Meta title="Your Wishlist" />
          <Container>
            <div className="wrapper">
              {/* Back to Shop Button */}
              <Link
                className="btn border-1 mt-sm-5 mt-lg-3 mb-3 btn-outline-dark btn-no-radius"
                to="/shop"
              >
                Back
              </Link>

              {/* Display wishlist items if available, otherwise show a prompt */}
              {wishlistItems.length > 0 ? (
                <>
                  <h1>Liked Items</h1>
                  <div className="liked-items my-4">
                    <div className="liked-container">
                      {wishlistItems.map((product) => (
                        <ProductCard product={product} key={product._id} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <h1 className="fs-2">
                  Explore our products and add items to your wishlist to see
                  them here.
                </h1>
              )}
            </div>
          </Container>

          {/* Featured products section for additional product suggestions */}
          <FeaturedProducts type="trending" />
        </>
      )}
    </div>
  );
};

export default WishListPage;
