import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
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

const CreateProductPage = () => {
  const navigate = useNavigate();

  // API Mutations for creating a product and uploading images
  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();
  const [uploadProductImages, { isLoading: loadingUploadImages }] =
    useUploadProductImagesMutation();

  // Fetch categories and brands for selection fields in the form
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

  // Initialize form state and handlers
  const {
    formData,
    setFormData,
    handleInputChange,
    handleSelectChange,
    handleFileChange
  } = useProductForm();

  // Submit handler with success navigation
  const handleSubmit = useProductSubmit(createProduct, {
    successMessage: "Product created successfully!",
    onSuccess: () => navigate("/admin/product-list")
  });

  // Apply page-specific styles on component mount and cleanup on unmount
  useEffect(() => {
    document.body.classList.add("product-create-page");
    return () => document.body.classList.remove("product-create-page");
  }, []);

  // Consolidate loading and error states for categories and brands
  const isLoading = categoriesLoading || brandsLoading;
  const error = categoriesError || brandsError;

  // Validate form data for required fields and format
  const { errors, isValid } = validateProductForm(formData || {});

  // Initialize empty form fields if not already set
  useEffect(() => {
    if (!formData) {
      setFormData({
        name: "",
        title: "",
        price: "",
        countInStock: "",
        discount: "",
        description: {
          material: "",
          fabric: "",
          careInstructions: ""
        },
        category: "",
        brand: "",
        type: [],
        images: [],
        isNewProduct: false,
        isDeal: false
      });
    }
  }, [formData, setFormData]);

  // Prevent submission if the form is invalid and display an error
  const onSubmit = (e) => {
    if (!isValid) {
      e.preventDefault();
      toast.error("Please fill out all required fields correctly.");
      return;
    }
    handleSubmit(e, { formData });
  };

  return (
    <ProductFormLayout
      title="Create Product"
      handleSubmit={onSubmit}
      isLoading={isLoading || loadingCreateProduct}
      error={error}
      submitText="Create product"
    >
      {/* Basic product information form section */}
      <ProductBasicInfo
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange(uploadProductImages)}
        loadingUploadImages={loadingUploadImages}
        errors={errors}
      />

      {/* Advanced product information form section */}
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

export default CreateProductPage;
