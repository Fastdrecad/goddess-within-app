import DescriptionSelect from "@/components/select/SelectDescription";

const DescriptionSelectors = ({
  formData,
  handleSelectChange,
  errors = {}
}) => {
  const handleDescriptionChange = (field, value) => {
    handleSelectChange("description", {
      ...formData.description,
      [field]: value
    });
  };

  return (
    <>
      <DescriptionSelect
        label="Select Material*"
        value={formData?.description?.material}
        onChange={(value) => handleDescriptionChange("material", value)}
        options={["Cotton", "Polyester", "Wool", "Linen", "Silk"]}
        error={errors.material}
      />

      <DescriptionSelect
        label="Select Fabric*"
        value={formData?.description?.fabric}
        onChange={(value) => handleDescriptionChange("fabric", value)}
        options={["Knit", "Woven", "Nonwoven", "Lace"]}
        error={errors.fabric}
      />

      <DescriptionSelect
        label="Select Care Instructions*"
        value={formData?.description?.careInstructions}
        onChange={(value) => handleDescriptionChange("careInstructions", value)}
        options={[
          "Machine Wash Cold",
          "Hand Wash",
          "Dry Clean Only",
          "Do Not Bleach"
        ]}
        error={errors.careInstructions}
      />
    </>
  );
};

export default DescriptionSelectors;
