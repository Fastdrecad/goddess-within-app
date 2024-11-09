import { SIZES_OPTIONS, TYPE_OPTIONS } from "@/constants/productOptions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useProductForm = (initialData = null) => {
  const [formData, setFormData] = useState(getDefaultFormData());

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        title: initialData.title || "",
        images: initialData.images || [],
        description: {
          material: initialData.description?.material || "",
          fabric: initialData.description?.fabric || "",
          careInstructions: initialData.description?.careInstructions || ""
        },
        category: initialData.category || { _id: "", name: "" },
        brand: initialData.brand || { _id: "", name: "" },
        price: initialData.price || 0,
        type: initialData.type || TYPE_OPTIONS.map((option) => option.value),
        countInStock: initialData.countInStock || 0,
        discount: initialData.discount || 0,
        isDeal: initialData.isDeal || false,
        isNewProduct: initialData.isNewProduct || false,
        sizes:
          Array.isArray(initialData.sizes) && initialData.sizes.length > 0
            ? initialData.sizes
            : SIZES_OPTIONS.map((size) => ({ size: size.value, quantity: 1 }))
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    if (typeof e === "string") {
      setFormData((prev) => ({
        ...prev,
        [e]: !prev[e]
      }));
      return;
    }

    if (!e?.target) {
      return;
    }

    const { id, type, checked, value } = e.target;

    switch (type) {
      case "checkbox":
        setFormData((prev) => ({
          ...prev,
          [id]: checked
        }));
        break;

      case "number":
        setFormData((prev) => ({
          ...prev,
          [id]: value === "" ? "" : Number(value)
        }));
        break;

      default:
        setFormData((prev) => ({
          ...prev,
          [id]: value
        }));
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (uploadFunction) => async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) {
      toast.error("Please select one or more files to upload.");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await uploadFunction(formData).unwrap();
      toast.success(response.message);
      setFormData((prev) => ({
        ...prev,
        images: response.images
      }));
    } catch (error) {
      toast.error(error?.data?.message || "Failed to upload images.");
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    TYPE_OPTIONS,
    SIZES_OPTIONS
  };
};

const getDefaultFormData = () => ({
  name: "",
  title: "",
  images: [],
  description: {
    material: "",
    fabric: "",
    careInstructions: ""
  },
  category: { _id: "", name: "" },
  brand: { _id: "", name: "" },
  price: 0,
  type: [],
  countInStock: 0,
  discount: 0,
  isDeal: false,
  isNewProduct: false,
  sizes: []
});

export default useProductForm;
