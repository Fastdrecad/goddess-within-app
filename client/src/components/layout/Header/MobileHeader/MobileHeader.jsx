import AdminProfileIcon from "@/components/layout/Header/components/AdminProfileIcon";
import BottomNav from "@/components/layout/Header/components/BottomNav";
import BrandLogo from "@/components/layout/Header/components/BrandLogo";
import CartIcon from "@/components/layout/Header/components/CartIcon";
import UserProfileIcon from "@/components/layout/Header/components/UserProfileIcon";
import WishlistIcon from "@/components/layout/Header/components/WishlistIcon";
import React from "react";

const MobileHeader = ({ toggleCart, toggleMenu, setIsInFocus, isInFocus }) => {
  return (
    <div className="navigation">
      <div className="top-nav">
        <div className="top-nav-wrapper">
          <div className="top-nav-box">
            <BrandLogo />

            <div className="app-icons">
              <div className="app-icons-box">
                <UserProfileIcon />
                <AdminProfileIcon />
                <WishlistIcon />
                <CartIcon toggleCart={toggleCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav
        toggleMenu={toggleMenu}
        setIsInFocus={setIsInFocus}
        isInFocus={isInFocus}
      />
    </div>
  );
};

export default MobileHeader;
