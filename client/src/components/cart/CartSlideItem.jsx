import { NavLink } from "react-router-dom";

import { formatPrice } from "@/utils/formatPrice";
import CartItemControls from "@/components/cart/CartItemControl";

const CartSlideItem = ({ item }) => {
  const { _id: id, title, sizes, price, images, qty } = item;
  const size = sizes[0].size;
  const img = images[0].url;

  // Use price formatter utility function
  const formattedPrice = formatPrice(price * qty);

  return (
    <div className="cart-slide-item-content">
      {/* Image Link */}
      <NavLink to={`/product/${id}`} className="cart-slide-item-image">
        <img src={img} alt={title} />
      </NavLink>

      {/* Item Details */}
      <div className="item-details">
        <h1 className="item-name mb-1">{item.name}</h1>
        <p className="item-title pb-1 m-0">{title}</p>

        {/* Quantity and Size */}
        <div className="item-info">
          <span className="item-quantity pe-2">
            Quantity: <span>{qty}</span>
          </span>
          <span className="item-size">Size: {size}</span>
        </div>

        {/* Price and Controls */}
        <div className="counter-container">
          <span className="item-price fw-bold">{formattedPrice} €</span>
          <CartItemControls item={item} id={id} />
        </div>
      </div>
    </div>
  );
};

export default CartSlideItem;
