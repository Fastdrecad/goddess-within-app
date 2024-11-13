import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { GoPersonFill } from "react-icons/go";

const AdminProfileIcon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!userInfo || userInfo.role !== "ROLE ADMIN") {
    return null;
  }

  const adminMenuItems = [
    { path: "/admin/product-list", label: "Products" },
    { path: "/admin/orderlist", label: "Orders" },
    { path: "/admin/userlist", label: "Users" },
    {
      path: "/admin/create-product",
      label: "CREATE PRODUCT",
      style: {
        backgroundColor: "#fb0000",
        fontWeight: "bold",
        borderBottom: 0
      }
    }
  ];

  return (
    <nav
      className="admin-profile-container"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
      ref={dropdownRef}
    >
      <span className={`admin-profile-icon ${isDropdownOpen ? "active" : ""}`}>
        <GoPersonFill />
      </span>

      {isDropdownOpen && (
        <div className="dropdown-admin-menu">
          <ul>
            {adminMenuItems.map(({ path, label, style }) => (
              <NavLink
                key={path}
                to={path}
                style={style}
                onClick={() => setIsDropdownOpen(false)}
              >
                <li
                  className={style?.borderBottom === 0 ? "border-bottom-0" : ""}
                >
                  <span
                    className={style?.fontWeight === "bold" ? "fw-bold" : ""}
                  >
                    {label}
                  </span>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default AdminProfileIcon;
