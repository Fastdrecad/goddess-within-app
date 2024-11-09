import { useState } from "react";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, toggle];
};

export default useDropdown;
