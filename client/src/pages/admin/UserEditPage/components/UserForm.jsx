import { Col, Row } from "react-bootstrap";
import Input from "@/components/ui/Input";
import SelectOption from "@/components/select/SelectOption";
import Button from "@/components/ui/Button";
import { ROLE_OPTIONS } from "@/constants/userOptions";

const UserForm = ({ formData, setFormData, handleSubmit, isLoading }) => {
  const handleInputChange = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };

  const handleSelectChange = (key, selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: selectedOption.value
    }));
  };

  const selectedRoleOption = ROLE_OPTIONS.find(
    (option) => option.value === formData.role
  );

  return (
    <form onSubmit={handleSubmit}>
      <Row className="align-items-center justify-content-center">
        <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }}>
          <h1 className="heading-register" style={{ textAlign: "left" }}>
            Update User
          </h1>

          {Object.entries(formData).map(([key, value]) => (
            <Col xs="12" key={key}>
              {key === "role" ? (
                <SelectOption
                  id={key}
                  label={`Select ${formatLabel(key)}`}
                  multi={false} // Changed to false since role is single select
                  options={ROLE_OPTIONS}
                  value={selectedRoleOption}
                  handleSelectChange={(selectedOption) =>
                    handleSelectChange("role", selectedOption)
                  }
                />
              ) : (
                <Input
                  id={key}
                  type={"text"}
                  label={`Enter ${formatLabel(key)}`}
                  name={key}
                  placeholder={formatLabel(key)}
                  value={value}
                  onInputChange={(e) => handleInputChange(key, e.target.value)}
                />
              )}
            </Col>
          ))}

          <div className="my-5">
            <Button
              type="submit"
              variant="primary"
              text="Update"
              size="lg"
              disabled={isLoading}
            />
          </div>
        </Col>
      </Row>
    </form>
  );
};

const formatLabel = (key) => {
  return key[0].toUpperCase() + key.slice(1) + "*";
};

export default UserForm;
