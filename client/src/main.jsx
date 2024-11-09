import React from "react";
import ReactDOM from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";

// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
import store from "@/redux/store";
import App from "@/App";

// Import application sass styles
import "@/assets/styles/style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
