// src/components/Header/BottomNav.jsx
import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";

import useSearchFilter from "@/hooks/useSearchFilter";

import Input from "@/components/ui/Input";

const BottomNav = ({ toggleMenu, setIsInFocus, isInFocus }) => {
  const inputRef = useRef(null);

  const { searchTerm, filteredItems, setSearchTerm } = useSearchFilter();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

  const handleFocus = () => {
    setIsInFocus(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsInFocus(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isInFocus, setIsInFocus]);

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-box">
        <div className="menu-icon">
          <span>
            <HiMiniBars3CenterLeft onClick={toggleMenu} />
          </span>
        </div>
        <div className="input-wrapper" ref={inputRef}>
          <Input
            id={"search"}
            placeholder={"Search..."}
            type={"text"}
            value={searchTerm}
            onInputFocus={handleFocus}
            onInputChange={handleInputChange}
          />

          {filteredItems?.length > 0 && (
            <div className={`search-container ${isInFocus ? "active" : ""}`}>
              <ul>
                {filteredItems.slice(0, 10).map((item) => (
                  <NavLink
                    style={{ width: "100%" }}
                    key={item._id}
                    to={`/product/${item._id}`}
                    onClick={() => {
                      setIsInFocus(true);
                      setSearchTerm("");
                    }}
                  >
                    <li className="d-flex">
                      <img
                        src={item.images[0].url}
                        alt="product thumbnail"
                        className="search-thumbnail"
                      />
                      <div className="product-thumbnail-content ms-4">
                        <h6>{item.name}</h6>
                        <p>${item.price}</p>
                      </div>
                    </li>
                  </NavLink>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
