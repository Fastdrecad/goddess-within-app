import Checkbox from "@/components/ui/Checkbox";
import { HeartIcon } from "@/components/ui/Icon";

const AddToWishList = ({ id, enabled, updateWishlist, liked, product }) => {
  return (
    <div className="add-to-wishlist">
      <Checkbox
        id={`checkbox_${id}`}
        name={"wishlist"}
        disabled={!enabled}
        checked={liked}
        label={<HeartIcon />}
        onChange={() => {
          updateWishlist(product);
        }}
      />
    </div>
  );
};

export default AddToWishList;
