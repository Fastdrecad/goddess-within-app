import Input from "@/components/ui/Input";

import ProductImageUpload from "../ProductImageUpload";
import ProductCheckboxes from "@/components/product/form/ProductCheckboxes";

const ProductBasicInfo = ({
  formData,
  handleInputChange,
  handleFileChange,
  loadingUploadImages,
  errors = {}
}) => {
  return (
    <div className="product-basic-info p-4 bg-white">
      <Input
        id="name"
        type="text"
        label="Enter Name*"
        value={formData?.name || ""}
        onInputChange={handleInputChange}
        error={errors.name}
      />
      <Input
        id="title"
        type="text"
        label="Enter Title*"
        value={formData?.title || ""}
        onInputChange={handleInputChange}
        error={errors.title}
      />
      <ProductImageUpload
        formData={formData}
        handleFileChange={handleFileChange}
        loadingUploadImages={loadingUploadImages}
      />
      <Input
        id="price"
        type="number"
        label="Enter Price*"
        value={formData?.price || ""}
        onInputChange={handleInputChange}
        error={errors.price}
        min={0}
        step="0.01"
      />
      <Input
        id="countInStock"
        type="number"
        label="Enter Count in Stock*"
        value={formData?.countInStock || ""}
        onInputChange={handleInputChange}
        error={errors.countInStock}
        min={0}
      />
      <Input
        id="discount"
        type="number"
        label="Enter Discount*"
        value={formData?.discount || ""}
        onInputChange={handleInputChange}
        error={errors.discount}
        min={0}
      />
      <ProductCheckboxes
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default ProductBasicInfo;
