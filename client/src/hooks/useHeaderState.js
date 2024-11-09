import { useState } from "react";

export const useHeaderState = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInFocus, setIsInFocus] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return {
    isCartOpen,
    isMenuOpen,
    isInFocus,
    setIsInFocus,
    toggleCart,
    toggleMenu
  };
};
