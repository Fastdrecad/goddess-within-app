import NavigationMenu from "@/components/layout/Header/components/NavigationMenu";

const BrandDrawer = ({ isMenuOpen, brandsData, toggleMenu }) => {
  return (
    <div
      className={isMenuOpen ? "mini-menu-open" : "hidden-mini-menu"}
      aria-hidden={!isMenuOpen}
    >
      <div className="mini-menu">
        <NavigationMenu
          isMenuOpen={isMenuOpen}
          brandsData={brandsData}
          toggleMenu={toggleMenu}
        />
      </div>
      <div
        className={
          isMenuOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
        }
        onClick={toggleMenu}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            toggleMenu();
          }
        }}
        role="button"
        tabIndex={0}
      />
    </div>
  );
};

export default BrandDrawer;
