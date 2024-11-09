import Select from "react-select";
import { FaWindowClose } from "react-icons/fa";
import makeAnimated from "react-select/animated";

const SelectSizesQtyInput = ({
  size,
  quantity,
  onChange,
  onRemove,
  sizeOptions
}) => {
  const animatedComponents = makeAnimated();

  return (
    <div className="d-flex flex-wrap gap-2">
      <div className="border border-1 border-dark">
        <div className="border-bottom border-black d-flex align-items-center justify-content-between p-1">
          <label htmlFor={`size-qty-${size}`} className="select-size-qty-label">
            Size & Qty*
          </label>
          <FaWindowClose
            style={{
              fontSize: "15px",
              cursor: "pointer",
              fill: "black",
              paddingRight: "4px"
            }}
            onClick={onRemove}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center flex-column p-1">
          <Select
            id={`size-qty-${size}`}
            value={{ value: size, label: size }}
            onChange={(selectedOption) =>
              onChange(selectedOption ? selectedOption.value : "")
            }
            options={sizeOptions}
            className="select-container bg-white"
            classNamePrefix="react-select"
            components={animatedComponents}
            isDisabled={true}
          />
          <input
            style={{ maxWidth: "80px", padding: "4px 6px" }}
            type="number"
            placeholder="qty"
            value={quantity}
            onChange={(e) => onChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectSizesQtyInput;
