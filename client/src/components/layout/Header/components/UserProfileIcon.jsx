import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoPerson } from "react-icons/go";

import { logout } from "@/redux/slices/authSlice";
import { resetCart } from "@/redux/slices/cartSlice";
import { useLogoutMutation } from "@/redux/slices/usersApiSlice";
import { clearAllWishlistItems } from "@/redux/slices/wishlistSlice";

import ProfileTab from "./ProfileTab";

const UserProfileIcon = () => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const toggleProfile = () => {
    if (userInfo) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
    setIsHovering(!isHovering);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      dispatch(clearAllWishlistItems());
      navigate("/login");
      setIsHovering(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={toggleProfile}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          toggleProfile();
        }
      }}
      className="profile-container"
      role="button"
      tabIndex="0"
      aria-haspopup="true"
      aria-expanded={isHovering}
    >
      <span className={`profile-icon ${isHovering ? "active" : ""}`}>
        <GoPerson />
      </span>
      {isHovering && (
        <ProfileTab
          logoutHandler={logoutHandler}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
        />
      )}
    </div>
  );
};

export default UserProfileIcon;
