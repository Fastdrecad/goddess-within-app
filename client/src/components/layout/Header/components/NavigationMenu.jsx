import Button from "@/components/ui/Button";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const NavigationMenu = ({ brandsData, toggleMenu }) => {
  const handleCategoryClick = () => {
    toggleMenu();
  };

  return (
    <div className="navigation-menu">
      <div className="menu-shop-header">
        {/* <NavLink
          className="menu-shop-title active"
          to="/shop"
          onClick={handleCategoryClick}
        >
          Shop
        </NavLink> */}
        <Button
          variant="primary"
          className="menu-shop-button"
          onClick={handleCategoryClick}
          text="Shop All Products"
          as={NavLink}
          to="/shop"
        />
      </div>

      <div className="menu-header">
        <h3 className="menu-title">Browse by brand</h3>
        <Button
          variant="none"
          className="close-button"
          onClick={toggleMenu}
          icon={<IoCloseOutline />}
          ariaLabel="Close menu"
        />
      </div>
      <div className="menu-body">
        <nav role="navigation">
          <ul className="menu-list">
            {brandsData?.brands.map((link, index) => (
              <li key={index} className="menu-item">
                <NavLink
                  onClick={handleCategoryClick}
                  to={"/brand/" + link.slug}
                  activeclassname="active-link"
                  exact="true"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationMenu;
