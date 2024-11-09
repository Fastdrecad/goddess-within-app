import { BsHandbag } from "react-icons/bs";
import { useSelector } from "react-redux";

const CartIcon = ({ toggleCart }) => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div
      className="cart-container"
      onClick={toggleCart}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          toggleCart();
        }
      }}
    >
      <span className="cart-icon">
        <BsHandbag />
        {cartItems?.length > 0 && (
          <span className="cart-badge">
            {cartItems.length >= 99 ? "99+" : cartItems.length}
          </span>
        )}
      </span>
    </div>
  );
};

export default CartIcon;
