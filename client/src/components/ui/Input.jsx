const Input = ({
  id,
  name,
  type,
  value,
  onInputChange,
  onInputFocus,
  onInputBlur,
  error,
  label,
  step,
  min,
  ...props
}) => {
  const handleChange = (e) => {
    e.target.id = id;
    onInputChange(e);
  };

  const handleFocus = (e) => {
    e.target.id = id;
    onInputFocus?.(e);
  };

  const styles = `input-box${error ? " invalid" : ""}`;

  // Helper function to handle error display
  const displayError = (error) => {
    if (!error) return null;
    return typeof error === "string" ? error : error[0];
  };

  const errorMessage = displayError(error);
  const errorClassName = errorMessage ? "invalid-message" : "";

  if (type === "number") {
    return (
      <div className={styles}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          step={step}
          min={min}
          {...props}
        />
        {errorMessage && <span className={errorClassName}>{errorMessage}</span>}
      </div>
    );
  }

  return (
    <div className={styles}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        {...props}
      />
      {errorMessage && <span className={errorClassName}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
