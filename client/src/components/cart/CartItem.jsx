import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";

import {
  addFromDropdownToCart,
  removeFromCart
} from "@/redux/slices/cartSlice";
import { toggleWishlistItem } from "@/redux/slices/wishlistSlice";

import { formatPrice } from "@/utils/formatPrice";
import { getProductWithSelectedSize } from "@/utils/productUtils";

import Dropdown from "@/components/ui/Dropdown";

const CartItem = ({ item, wishlistItems }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { _id: id, title, sizes, price, images, qty } = item;
  const size = sizes[0].size;
  const img = images[0].url;

  // Generate quantity options based on available stock for the selected size
  const quantities = [...Array(sizes[0].quantity).keys()].map((number) => ({
    label: number + 1,
    value: number + 1
  }));

  // Check if the item is already in the wishlist
  const isInWishList = wishlistItems.some((wishItem) => wishItem._id === id);

  // Handle quantity change by updating the cart with the selected quantity
  const handleChangeQty = (qty) => {
    const selectedSizeProduct = getProductWithSelectedSize(item, size);
    dispatch(addFromDropdownToCart({ ...selectedSizeProduct, qty: qty.value }));
  };

  // Update wishlist, requires user to be logged in
  const updateWishList = (product) => {
    if (userInfo) {
      dispatch(toggleWishlistItem(product));
    } else {
      console.log("Please login", userInfo);
    }
  };

  // Handle keyboard events for accessibility (Enter/Space triggers action)
  const handleKeyDown = (event, action) => {
    if (event.key === "Enter" || event.key === "Space") {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <div className="cart-item-image">
          <div className="product-image">
            <Link to={`/product/${id}`}>
              <img src={img} alt="" />
            </Link>
          </div>
        </div>
        <div className="product-content">
          <div className="product-details-group">
            <div className="product-details">
              <div className="product-name-content">
                <span className="product-name">
                  <span>Product: </span>
                  {title}
                </span>
              </div>
              <div className="product-id-content">
                <span className="product-id">
                  <span>Id: </span>
                  {id}
                </span>
              </div>
              <div className="product-size-content">
                <span className="product-size">
                  <span>Size: </span>
                  {size}
                </span>
              </div>
            </div>

            {/* Quantity Dropdown */}
            <div className="amount-container">
              <span>Qty: </span>
              <Dropdown
                options={quantities}
                title={qty}
                value={qty}
                onChange={handleChangeQty}
                style={{ width: "100% !important" }}
                maxItems={10}
              />
            </div>
          </div>

          {/* Wishlist and Remove Actions */}
          <div className="product-bottom-content">
            <div className="cart-control-icons">
              <span
                className="trash-icon"
                aria-label="Remove from cart"
                tabIndex="0"
                role="button"
                onClick={() => dispatch(removeFromCart({ ...item }))}
                onKeyDown={(event) =>
                  handleKeyDown(event, () =>
                    dispatch(removeFromCart({ ...item }))
                  )
                }
              >
                <FaTrash style={{ marginRight: "5px" }} />
                Remove
              </span>
              <span
                className="heart-icon"
                tabIndex="0"
                role="button"
                aria-label={
                  isInWishList ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={() => updateWishList(item)}
                onKeyDown={(event) =>
                  handleKeyDown(event, () => updateWishList(item))
                }
              >
                {isInWishList ? (
                  <FaHeart style={{ fill: "#e62525" }} />
                ) : (
                  <FaRegHeart />
                )}
                <span className="ms-1">
                  {isInWishList ? "On your wishlist" : "Add to wishlist"}
                </span>
              </span>
            </div>

            {/* Price Display */}
            <div className="product-price-wrapper">
              <span className="product-price">{formatPrice(price, qty)}€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
