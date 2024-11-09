import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";

import { formatPrice } from "@/utils/formatPrice";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/constants";

import CartSlideItem from "@/components/cart/CartSlideItem";
import Button from "@/components/ui/Button";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const navigate = useNavigate();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  // Calculate subtotal and total cost
  const calculateSubtotal = (items) => {
    return items.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  const calculateTotal = (subtotal) => {
    return subtotal > FREE_SHIPPING_THRESHOLD
      ? subtotal
      : subtotal + SHIPPING_COST;
  };

  const subtotal = calculateSubtotal(cartItems);
  const total = calculateTotal(subtotal);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Navigate to the specified path and close the cart
  const handleNavigate = (path) => {
    navigate(path);
    toggleCart();
  };

  // Cart header with close icon
  const CartHeader = () => (
    <div className="cart-header py-4">
      <h1 className="ps-4 m-0">Your Bag</h1>
      <IoCloseOutline onClick={toggleCart} />
    </div>
  );

  // Display list of cart items
  const CartItems = () => (
    <div className="cart-body">
      <div className="cart-container">
        <div className="inner-drawer">
          <ul className="item-container">
            {cartItems.map((item) => (
              <li key={item._id} className="item-list">
                <CartSlideItem item={item} wishlistItems={wishlistItems} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // Display subtotal and navigation buttons
  const CartTotal = () => (
    <div className="total">
      <div className="total-cost">
        <span className="fw-bold">Subtotal</span>
        <span>
          <b>{formatPrice(total)}</b>
        </span>
      </div>
      <Button
        variant="primary"
        text="Continue Shopping"
        size="lg"
        onClick={() => handleNavigate("/shop")}
      />
      <Button
        variant="danger"
        text="Go to Bag"
        size="lg"
        className="checkout"
        disabled={cartItems.length === 0}
        onClick={() => handleNavigate("/cart")}
      />
    </div>
  );

  // Display when cart is empty
  const EmptyCart = () => (
    <div className="empty-cart">
      <HiOutlineShoppingBag />
      <h2>Your shopping cart is empty</h2>
    </div>
  );

  return (
    <div className="cart">
      <CartHeader />
      {cartItems.length > 0 ? (
        <>
          <CartItems />
          <CartTotal />
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
