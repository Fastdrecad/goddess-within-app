import SelectSizesQtyInput from "@/components/select/SelectSizesQtyInput";
import Dropdown from "@/components/ui/Dropdown";
import { SIZES_OPTIONS } from "@/constants/productOptions";

const SizeQuantityInputs = ({ formData, setFormData, errors }) => {
  const availableSizes = SIZES_OPTIONS.filter(
    (sizeOption) =>
      !formData.sizes.some((item) => item.size === sizeOption.value)
  );

  const handleSizeQuantityChange = (size, quantity) => {
    if (quantity < 0) {
      quantity = 0;
    }

    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((item) =>
        item.size === size ? { ...item, quantity } : item
      )
    }));
  };

  const handleAddSize = (selectedOption) => {
    const sizeExists = formData.sizes.some(
      (size) => size.size === selectedOption.value
    );

    if (!sizeExists) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, { size: selectedOption.value, quantity: 1 }]
      }));
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setFormData((prev) => {
      const updatedSizes = prev.sizes.filter(
        (item) => item.size !== sizeToRemove
      );
      return {
        ...prev,
        sizes: updatedSizes.length > 0 ? updatedSizes : []
      };
    });
  };

  return (
    <>
      {/* Dropdown for adding a new size */}
      {availableSizes.length > 0 && (
        <div className="add-size-dropdown">
          <label
            htmlFor="size-select"
            className="px-2 py-1 fw-bold text-dark fs-12 border border-dark border-bottom-0"
          >
            Add Size*
          </label>
          <Dropdown
            options={availableSizes}
            onChange={handleAddSize}
            title="Select Size"
          />
        </div>
      )}
      <div className="size-quantity-container d-flex flex-wrap flex-row gap-2 px-2">
        {/* Render each selected size input */}
        {formData.sizes.map((sizeObj, index) => (
          <div key={index} className="size-quantity-input">
            <SelectSizesQtyInput
              size={sizeObj.size}
              quantity={sizeObj.quantity}
              onChange={(quantity) =>
                handleSizeQuantityChange(sizeObj.size, quantity)
              }
              onRemove={() => handleRemoveSize(sizeObj.size)}
              sizeOptions={availableSizes}
            />
          </div>
        ))}

        {errors.sizes && (
          <span className="invalid-message">{errors.sizes}</span>
        )}
      </div>
    </>
  );
};

export default SizeQuantityInputs;
