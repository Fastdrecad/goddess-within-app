import { Col } from "react-bootstrap";
import TypeSelector from "./TypeSelector";
import SizeQuantityInputs from "./SizeQuantityInputs";
import DescriptionSelectors from "./DescriptionSelectors";
import CategoryBrandSelectors from "./CategoryBrandSelectors";
import { SIZES_OPTIONS } from "@/constants/productOptions";

const ProductAdvancedInfo = ({
  formData,
  setFormData,
  handleSelectChange,
  categoriesData,
  brandsData,
  errors = {}
}) => {
  return (
    <Col xs={12} className="p-4 bg-white">
      <CategoryBrandSelectors
        formData={formData}
        setFormData={setFormData}
        handleSelectChange={handleSelectChange}
        categoriesData={categoriesData}
        brandsData={brandsData}
        errors={errors}
      />

      <TypeSelector
        formData={formData}
        handleSelectChange={handleSelectChange}
        error={errors.type}
      />

      <SizeQuantityInputs
        formData={formData}
        onQuantityChange={handleSelectChange}
        setFormData={setFormData}
        sizeOptions={SIZES_OPTIONS}
        errors={errors}
      />

      <DescriptionSelectors
        formData={formData}
        handleSelectChange={handleSelectChange}
        errors={errors}
      />
    </Col>
  );
};

export default ProductAdvancedInfo;
