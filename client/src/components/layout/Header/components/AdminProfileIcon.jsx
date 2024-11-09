import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { GoPersonFill } from "react-icons/go";

const AdminProfileIcon = () => {
  const [isAtAdmin, setIsAtAdmin] = useState(false);
  const dropDownRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsAtAdmin(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsAtAdmin(true);
  };

  const handleMouseLeave = () => {
    setIsAtAdmin(false);
  };

  return (
    userInfo &&
    userInfo.role === "ROLE ADMIN" && (
      <div
        className="admin-profile-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={dropDownRef}
        role="navigation"
      >
        <span className={`admin-profile-icon ${isAtAdmin ? "active" : ""}`}>
          <GoPersonFill />
        </span>
        {isAtAdmin && (
          <div className="dropdown-admin-menu">
            <ul>
              <NavLink to="/admin/product-list">
                <li>
                  <span>Products</span>
                </li>
              </NavLink>
              <NavLink to="/admin/orderlist">
                <li>
                  <span>Orders</span>
                </li>
              </NavLink>
              <NavLink to="/admin/userlist">
                <li>
                  <span>Users</span>
                </li>
              </NavLink>
              <NavLink
                className="link-underline-opacity-75-hover"
                to="/admin/create-product"
                style={{ backgroundColor: "#fb0000" }}
              >
                <li className="border-bottom-0">
                  <span className="fw-bold">CREATE PRODUCT</span>
                </li>
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default AdminProfileIcon;
