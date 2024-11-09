import { Form } from "react-bootstrap";

const ProductCheckboxes = ({ formData, handleInputChange }) => {
  return (
    <div className="d-flex gap-4">
      <Form.Group controlId="isNewProduct" className="my-2">
        <Form.Check
          type="checkbox"
          label="Is New Product"
          checked={formData.isNewProduct}
          onChange={(e) => handleInputChange("isNewProduct", e.target.checked)}
        />
      </Form.Group>
      <Form.Group controlId="isDeal" className="my-2">
        <Form.Check
          type="checkbox"
          label="Is Deal"
          checked={formData.isDeal}
          onChange={(e) => handleInputChange("isDeal", e.target.checked)}
        />
      </Form.Group>
    </div>
  );
};

export default ProductCheckboxes;
