import { useGetBrandsListQuery } from "@/redux/slices/brandApiSlice";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";

import { useHeaderState } from "@/hooks/useHeaderState";

import BrandDrawer from "@/components/layout/BrandDrawer/BrandDrawer";
import CartDrawer from "@/components/layout/CartDrawer/CartDrawer";
import {
  DesktopHeader,
  MobileHeader,
  TopBar
} from "@/components/layout/Header";

const Header = () => {
  const { data: brandsData } = useGetBrandsListQuery();
  const { data: productsData } = useGetProductsQuery();

  const {
    isCartOpen,
    isMenuOpen,
    isInFocus,
    toggleCart,
    toggleMenu,
    setIsInFocus
  } = useHeaderState();

  return (
    <header className="header">
      {/* ANNOUNCEMENT */}
      <TopBar />

      {/* DESKTOP HEADER */}
      <DesktopHeader productsData={productsData} toggleCart={toggleCart} />

      {/* HIDDEN CART DRAWER */}
      <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />

      {/* MOBILE NAVIGATION */}
      <MobileHeader
        isInFocus={isInFocus}
        setIsInFocus={setIsInFocus}
        toggleCart={toggleCart}
        toggleMenu={toggleMenu}
      />

      {/* HIDDEN BRAND DRAWER */}
      <BrandDrawer
        brandsData={brandsData}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
    </header>
  );
};

export default Header;
