import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";

const EmptyCart = ({ toggleCart }) => (
  <div className="cart">
    <div className="cart-header py-4">
      <h1 className="ps-4 m-0">Your Bag</h1>
      <IoCloseOutline onClick={toggleCart} />
    </div>
    <div className="empty-cart">
      <HiOutlineShoppingBag />
      <h2>Your shopping cart is empty</h2>
    </div>
  </div>
);

export default EmptyCart;
