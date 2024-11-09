export const handlePriceInput = (value, setFormData) => {
  const regex = /^\d*\.?\d*$/;
  if (regex.test(value) || value === "") {
    const floatValue = parseFloat(value);
    if (floatValue > 0 || value === "") {
      setFormData((prev) => ({ ...prev, price: value }));
    }
  }
};

export const handleNumericInput = (key, value, setFormData) => {
  const intValue = parseInt(value, 10);
  if (!isNaN(intValue)) {
    setFormData((prev) => ({ ...prev, [key]: intValue }));
  }
};

export const handleBooleanInput = (key, value, setFormData) => {
  setFormData((prev) => ({ ...prev, [key]: value }));
};

export const handleDefaultInput = (key, value, setFormData) => {
  setFormData((prev) => ({ ...prev, [key]: value }));
};
