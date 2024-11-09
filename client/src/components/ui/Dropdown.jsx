import { useEffect, useRef, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from "react-icons/md";

const Dropdown = ({ value, options, onChange, title, maxItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleDropdownClickOutside = (e) => {
      if (!dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleDropdownClickOutside, true);

    return () => {
      document.removeEventListener("click", handleDropdownClickOutside, true);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Space") {
      toggleDropdown();
    }
  };

  const handleChange = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const displayedOptions = maxItems ? options?.slice(0, maxItems) : options;

  const renderedOptions = displayedOptions?.map((option) => {
    return (
      <li
        onClick={() => handleChange(option)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Space") handleChange(option);
        }}
        key={option.value}
        tabIndex="0"
        className="dropdown-listItem"
        role="option"
        aria-selected
      >
        {option.label}
      </li>
    );
  });

  return (
    <div ref={dropDownRef} className="dropdown-container" role="listbox">
      <div
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-expanded={isOpen}
        className={`dropdown-header ${isOpen ? "active" : ""}`}
        aria-label={title}
      >
        {value?.label || title}
        {isOpen ? (
          <MdOutlineKeyboardArrowUp style={{ fontSize: "25px" }} />
        ) : (
          <MdOutlineKeyboardArrowDown style={{ fontSize: "25px" }} />
        )}
      </div>
      {isOpen && (
        <div className="dropdownList-container">
          <ul className="dropdown-list">{renderedOptions}</ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
