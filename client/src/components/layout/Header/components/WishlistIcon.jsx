import { BsHeart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WishlistIcon = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleWishlistClick = () => {
    if (userInfo) {
      navigate("/wishlist");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      onClick={handleWishlistClick}
      className="wishlist-container"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleWishlistClick();
        }
      }}
    >
      <span className="wishlist-icon">
        <BsHeart />
        {wishlistItems.length > 0 && (
          <span className="wishlist-badge">
            {wishlistItems.length >= 99 ? "99+" : wishlistItems.length}
          </span>
        )}
      </span>
    </div>
  );
};

export default WishlistIcon;
