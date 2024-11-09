import { Form } from "react-bootstrap";

const ProductCheckboxes = ({ formData, handleInputChange }) => {
  console.log("ProductCheckboxes render:", { formData });

  return (
    <div className="d-flex gap-4">
      <Form.Group className="my-2">
        <Form.Check
          type="checkbox"
          id="isNewProduct"
          label="Is New Product"
          checked={formData?.isNewProduct || false}
          onChange={() => {
            console.log("Toggling isNewProduct");
            handleInputChange("isNewProduct");
          }}
        />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Check
          type="checkbox"
          id="isDeal"
          label="Is Deal"
          checked={formData?.isDeal || false}
          onChange={() => {
            console.log("Toggling isDeal");
            handleInputChange("isDeal");
          }}
        />
      </Form.Group>
    </div>
  );
};

export default ProductCheckboxes;
