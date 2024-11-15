import { useEffect, useState } from "react";

const Checkbox = ({
  className = "",
  id,
  name,
  label,
  disabled,
  checked = false,
  onChange
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const _onChange = (e) => {
    setIsChecked(!isChecked);

    const value = e.target.checked;
    const name = e.target.name;
    onChange(name, value);
  };

  const isLabelText = label && typeof label === "string";
  const extraClassName = isLabelText
    ? ` default-icon ${className}`
    : ` custom-icon ${className}`;

  return (
    <div className={`checkbox${extraClassName}`}>
      <input
        className={"input-checkbox"}
        type={"checkbox"}
        id={id}
        name={name}
        checked={!disabled ? isChecked : false}
        onChange={_onChange}
      />
      <label htmlFor={id} type="submit">
        {isLabelText ? label : label}
      </label>
    </div>
  );
};

export default Checkbox;
