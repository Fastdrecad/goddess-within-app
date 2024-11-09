import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useGetBrandsListQuery } from "@/redux/slices/brandApiSlice";

import DropdownMenu from "@/components/ui/DropdownMenu";

const NavItemBrand = () => {
  const [isOverBrands, setIsOverBrands] = useState(false);
  const dropDownBrandsRef = useRef(null);
  const { data: brandsData } = useGetBrandsListQuery();

  const handleClickBrands = () => {
    setIsOverBrands(!isOverBrands);
  };

  const handleOutsideClick = (e) => {
    if (
      dropDownBrandsRef.current &&
      !dropDownBrandsRef.current.contains(e.target)
    ) {
      setIsOverBrands(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  return (
    <div
      className="brand-drop"
      ref={dropDownBrandsRef}
      onClick={handleClickBrands}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleClickBrands();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className={`d-flex align-items-center justify-content-center brands-content ${isOverBrands ? "active" : ""}`}
      >
        <span className="d-none d-sm-block brand-text">Brands</span>
        <span>
          <IoIosArrowDown style={{ fontSize: "20px" }} />
        </span>
      </div>
      {isOverBrands && (
        <DropdownMenu
          isOverBrands={isOverBrands}
          setIsOverBrands={setIsOverBrands}
          brandsData={brandsData}
        />
      )}
    </div>
  );
};

export default NavItemBrand;
