import Cart from "@/components/cart/Cart";

const CartDrawer = ({ isCartOpen, toggleCart }) => {
  return (
    <div
      className={isCartOpen ? "mini-cart-open" : "hidden-mini-cart"}
      aria-hidden={isCartOpen ? false : true}
    >
      <div className="mini-cart">
        <Cart isCartOpen={isCartOpen} setIsCartOpen={toggleCart} />
      </div>
      <div
        className={
          isCartOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
        }
        onClick={toggleCart}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            toggleCart();
          }
        }}
        role="button"
        tabIndex={0}
      />
    </div>
  );
};

export default CartDrawer;
