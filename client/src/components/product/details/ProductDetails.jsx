import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlistItem } from "@/redux/slices/wishlistSlice";

import AddToWishList from "@/components/product/shared/AddToWishList";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { getProductWithSelectedSize } from "@/utils/productUtils";
import { areProductsEqual } from "@/utils/cartUtils";

const style = {
  fontSize: "1.5rem",
  color: "red",
  marginRight: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const title = { size: "Choose your size" };

const ProductDetails = ({ product }) => {
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  // Map available sizes for dropdown options
  const sizes = product?.sizes?.map((item) => ({
    label: item.size,
    value: item.size
  }));

  // Handle size selection and check stock availability
  const handleChangeSize = (size) => {
    setIsButtonDisabled(false);
    setErr(null);
    setSize(size);

    if (!size) {
      setIsOutOfStock(false);
      return;
    }

    const selectedSizeProduct = getProductWithSelectedSize(product, size.value);
    const { quantity } = selectedSizeProduct.sizes[0];

    // Disable button if selected size is out of stock
    if (quantity === 0) {
      setErr("This size is out of stock");
      setIsButtonDisabled(true);
      setIsOutOfStock(true);
      return;
    }
    setIsOutOfStock(false);

    // Check if product with selected size is already in cart
    const existsItem = cartItems.find((item) =>
      areProductsEqual(item, selectedSizeProduct)
    );

    if (existsItem) {
      const { qty: cartQty } = existsItem;
      if (cartQty === quantity) {
        setErr(
          "All items are already in the cart. Please choose a different size."
        );
        setIsButtonDisabled(true);
      }
    } else {
      setQty(1);
    }
  };

  // Add product with selected size and quantity to the cart
  const addToCartHandler = () => {
    if (!size) {
      setErr("Please choose your size");
      setIsButtonDisabled(true);
      return;
    }

    const selectedSizeProduct = getProductWithSelectedSize(product, size.value);
    const productSizeQuantity = selectedSizeProduct.sizes[0].quantity;

    if (qty <= productSizeQuantity) {
      dispatch(addToCart({ ...selectedSizeProduct, qty, size: size.value }));
      toast.success("Product added to bag.");
    } else {
      setErr("Our collection is out of stock");
      setIsButtonDisabled(true);
    }
  };

  // Toggle wishlist status for the product
  const updateWishList = (product) => {
    if (userInfo) {
      dispatch(toggleWishlistItem(product));
    } else {
      console.log("Please login to add items to the wishlist");
    }
  };

  return (
    <div className="product-container-box">
      <div className="item-box">
        <div className="item-details">
          <h1 className="item-name one-line-ellipsis">{product?.name}</h1>
          <h1 className="item-title">{product?.title}</h1>

          {/* Product Description */}
          <div className="item-description">
            {product?.description?.material && (
              <p className="item-desc one-line-ellipsis">
                <strong>Material: </strong> {product.description.material}
              </p>
            )}
            {product?.description?.fabric && (
              <p className="item-desc one-line-ellipsis">
                <strong>Fabric: </strong> {product.description.fabric}
              </p>
            )}
            {product?.description?.careInstructions && (
              <p className="item-desc one-line-ellipsis">
                <strong>Care Instruction: </strong>{" "}
                {product.description.careInstructions}
              </p>
            )}
          </div>

          {/* Price and Discount Display */}
          <span
            className="item-price"
            style={{ color: product?.discount ? "red" : "inherit" }}
          >
            {new Intl.NumberFormat("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(product.price)}{" "}
            €
          </span>
          {product?.discount && (
            <h3 className="item-originally-price">
              <span className="item-originally">
                Originally:{" "}
                {new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(
                  Math.floor(
                    (product.price / (1 - product.discount / 100)) * 100
                  ) / 100
                )}{" "}
                €
              </span>
              <span className="item-discount">-{product.discount}%</span>
            </h3>
          )}
        </div>

        {/* Error Message for stock or size issues */}
        {err && (
          <p className="d-flex py-2 px-0 mt-2 align-items-center bg-light">
            <AiFillCloseCircle style={style} />
            {err}
          </p>
        )}

        {/* Size Selection Dropdown */}
        <Dropdown
          options={sizes}
          title={title.size}
          value={size}
          onChange={handleChangeSize}
          style={{ width: "100% !important" }}
        />

        {/* Action Buttons for Add to Bag and Wishlist */}
        <div className="button-content">
          <Button
            variant="primary"
            text="Add to Bag"
            size="lg"
            disabled={isButtonDisabled || !size || isOutOfStock}
            onClick={addToCartHandler}
          />
          <AddToWishList
            id={product._id}
            product={product}
            liked={
              wishlistItems.some((item) => item._id === product._id) &&
              userInfo?._id
            }
            updateWishlist={updateWishList}
            enabled={userInfo}
            authenticated={userInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
