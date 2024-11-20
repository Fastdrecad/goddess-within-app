import Button from "@/components/ui/Button";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { toggleWishlistItem } from "@/redux/slices/wishlistSlice";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartItemControls = ({ item, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  // Check if the item is already in the wishlist
  const isInWishList = wishlistItems.some((item) => item._id === id);

  // Toggle item in wishlist if user is logged in, else prompt login
  const updateWishList = (product) => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(toggleWishlistItem(product));
    }
  };

  return (
    <div className="cart-icons">
      {/* Button to remove item from cart */}
      <Button
        icon={<FaTrash />}
        className="trash-icon p-0 pe-2"
        iconClassName={"me-2"}
        text="Remove"
        iconDirection="left"
        textColor="trash-icon-text"
        onClick={() => dispatch(removeFromCart({ ...item }))}
      />

      {/* Button to add/remove item from wishlist */}
      <Button
        icon={
          isInWishList ? (
            <FaHeart style={{ fill: "#e62525" }} />
          ) : (
            <FaRegHeart />
          )
        }
        className="p-0 heart-icon"
        iconClassName={"me-2"}
        text={isInWishList ? "On your wishlist" : "Add to wishlist"}
        iconDirection="left"
        ariaLabel={isInWishList ? "Remove from wishlist" : "Add to wishlist"}
        textColor="heart-icon-text"
        onClick={() => updateWishList(item)}
      />
    </div>
  );
};

export default CartItemControls;
