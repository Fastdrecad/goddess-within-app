import SelectOption from "@/components/select/SelectOption";
import { TYPE_OPTIONS } from "@/constants/productOptions";

const TypeSelector = ({ formData, handleSelectChange, error }) => {
  const selectedTypes = Array.isArray(formData?.type)
    ? formData.type.map((type) =>
        TYPE_OPTIONS.find((opt) => opt.value === type)
      )
    : [];

  return (
    <SelectOption
      label="Select Type*"
      multi={true}
      options={TYPE_OPTIONS}
      value={selectedTypes}
      handleSelectChange={(selectedOptions) => {
        const selectedValues = selectedOptions
          ? selectedOptions.map((option) => option.value)
          : [];
        handleSelectChange("type", selectedValues);
      }}
      error={error}
    />
  );
};

export default TypeSelector;
