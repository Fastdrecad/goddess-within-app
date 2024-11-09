import { Form, Row, Col } from "react-bootstrap";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ProductImageUpload = ({
  formData,
  handleFileChange,
  loadingUploadImages
}) => {
  return (
    <Form.Group controlId="images" className="my-2">
      <Form.Label>
        Choose images ({formData?.images?.length} selected)
      </Form.Label>
      <Form.Control
        className="rounded-0"
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      {formData?.images?.length > 0 ? (
        <Row className="image-preview gap-2 border border-black m-0">
          {formData.images.map((image, index) => (
            <Col xs={4} key={index} className="p-0">
              <img src={image.thumbnail} alt={`Thumbnail ${index + 1}`} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No images selected</p>
      )}
      {loadingUploadImages && (
        <Row className="align-items-center justify-content-center">
          <LoadingSpinner />
        </Row>
      )}
    </Form.Group>
  );
};

export default ProductImageUpload;
