import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadProductImagesMutation
} from "@/redux/slices/productsApiSlice";
import { useGetCategoriesQuery } from "@/redux/slices/categoryApiSlice";
import { useGetBrandsListQuery } from "@/redux/slices/brandApiSlice";
import ProductFormLayout from "@/components/product/form/ProductFormLayout";
import ProductBasicInfo from "@/components/product/form/ProductBasicInfo";
import ProductAdvancedInfo from "@/components/product/form/ProductAdvancedInfo";
import { useProductForm } from "@/components/product/form/hooks/useProductForm";
import { useProductSubmit } from "@/components/product/form/hooks/useProductSubmit";
import { validateProductForm } from "@/components/product/form/utils/validations";
import { toast } from "react-toastify";

const EditProductPage = () => {
  const { id: productId } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();

  // Fetch existing product, categories, and brands data
  const {
    data: product,
    isLoading: productLoading,
    error: productError
  } = useGetProductQuery(productId);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError
  } = useGetCategoriesQuery();

  const {
    data: brandsData,
    isLoading: brandsLoading,
    error: brandsError
  } = useGetBrandsListQuery();

  // Mutations for updating the product and uploading images
  const [updateProduct, { isLoading: loadingUpdateProduct }] =
    useUpdateProductMutation();

  const [uploadProductImages, { isLoading: loadingUploadImages }] =
    useUploadProductImagesMutation();

  // Initialize form state with existing product data
  const {
    formData,
    setFormData,
    handleInputChange,
    handleSelectChange,
    handleFileChange
  } = useProductForm(product);

  // Handler for submitting the updated product data
  const handleSubmit = useProductSubmit(updateProduct, {
    successMessage: "Product updated successfully!",
    onSuccess: () => navigate("/admin/product-list")
  });

  // Add a class to the body for styling and clean up on unmount
  useEffect(() => {
    document.body.classList.add("product-edit-page");
    return () => document.body.classList.remove("product-edit-page");
  }, []);

  // Consolidate loading and error states
  const isLoading = productLoading || categoriesLoading || brandsLoading;
  const error = productError || categoriesError || brandsError;

  // Validate form data and display error if invalid
  const { errors, isValid } = validateProductForm(formData || {});

  // Submit handler that validates the form before submitting
  const onSubmit = (e) => {
    if (!isValid) {
      e.preventDefault();
      toast.error("Please fill out all required fields correctly.");
      return;
    }
    handleSubmit(e, { productId, formData });
  };

  return (
    <ProductFormLayout
      title="Edit Product"
      handleSubmit={onSubmit}
      isLoading={isLoading || loadingUpdateProduct}
      error={error}
      submitText="Update Product"
    >
      {/* Basic Info Form Section */}
      <ProductBasicInfo
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange(uploadProductImages)}
        loadingUploadImages={loadingUploadImages}
        errors={errors}
      />

      {/* Advanced Info Form Section */}
      <ProductAdvancedInfo
        formData={formData}
        setFormData={setFormData}
        handleSelectChange={handleSelectChange}
        categoriesData={categoriesData}
        brandsData={brandsData}
        errors={errors}
      />
    </ProductFormLayout>
  );
};

export default EditProductPage;
