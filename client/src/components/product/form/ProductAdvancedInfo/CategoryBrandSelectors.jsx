import SelectByFieldName from "@/components/select/SelectByFiledName";

const CategoryBrandSelectors = ({
  formData,
  setFormData,
  categoriesData,
  brandsData,
  errors = {}
}) => {
  return (
    <>
      <SelectByFieldName
        formData={formData}
        data={categoriesData?.categories}
        label="Select or add a category"
        type="category"
        error={errors.category}
        setFormData={setFormData}
      />

      <SelectByFieldName
        formData={formData}
        data={brandsData?.brands}
        label="Select or add a brand"
        type="brand"
        error={errors.brand}
        setFormData={setFormData}
      />
    </>
  );
};

export default CategoryBrandSelectors;
