import { HiMiniBars3CenterLeft } from "react-icons/hi2";

const MenuIcon = ({ toggleMenu }) => (
  <div
    className="menu-icon"
    role="button"
    tabIndex={0}
    onClick={toggleMenu}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        toggleMenu();
      }
    }}
  >
    <HiMiniBars3CenterLeft />
  </div>
);

export default MenuIcon;
