import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SlugProvider } from "@/contexts/SlugContext";

import RoutesConfig from "@/routes/routes";

import MainLayout from "@/components/layout/MainLayout/MainLayout";
import ScrollToTop from "@/ScrollToTop";

function App() {
  return (
    <PayPalScriptProvider deferLoading={true}>
      <Router future={{ v7_startTransition: true }}>
        <ScrollToTop />
        <SlugProvider>
          <MainLayout>
            <RoutesConfig />
          </MainLayout>
        </SlugProvider>
      </Router>
      <ToastContainer />
    </PayPalScriptProvider>
  );
}

export default App;
