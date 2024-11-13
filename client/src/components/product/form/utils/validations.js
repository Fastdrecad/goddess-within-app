export const validateProductForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.title?.trim()) {
    errors.title = "Title is required";
  }

  if (!formData.price || formData.price <= 0) {
    errors.price = "Price must be greater than 0";
  }

  if (!formData.type?.length) {
    errors.type = "At least one type must be selected";
  }

  if (!formData.category || typeof formData.category._id !== "string") {
    errors.category = "Category is required and should be a valid string";
  }
  if (!formData.brand || typeof formData.brand._id !== "string") {
    errors.brand = "Brand is required and should be a valid string";
  }

  if (!formData.description?.material?.trim()) {
    errors.material = "Material is required";
  }

  if (!formData.description?.fabric?.trim()) {
    errors.fabric = "Fabric is required";
  }

  if (!formData.description?.careInstructions?.trim()) {
    errors.careInstructions = "Care instructions are required";
  }

  // Validation for sizes: checks if at least one size is provided with valid quantity
  if (!formData.sizes || !formData.sizes.length) {
    errors.sizes = "At least one size must be provided";
  } else {
    const invalidSize = formData.sizes.some(
      (size) =>
        !size.size || typeof size.quantity !== "number" || size.quantity <= 0
    );
    if (invalidSize) {
      errors.sizes =
        "Each product size must have a valid quantity greater than 0";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
