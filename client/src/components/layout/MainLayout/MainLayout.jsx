import { useLocation } from "react-router-dom";

import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import GoToTop from "@/components/navigation/GoToTop";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div
          className={`container ${isHomePage ? "container-fluid p-0 mw-100" : ""}`}
        >
          <div className={`wrapper ${isHomePage ? "wrapper-home" : ""}`}>
            {children}
          </div>
        </div>
      </main>
      <GoToTop />
      <Footer />
    </div>
  );
};

export default MainLayout;
