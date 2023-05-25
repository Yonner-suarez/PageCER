import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Auth0Provider } from "@auth0/auth0-react";

axios.defaults.baseURL = "https://backcer-production.up.railway.app";
// "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-io160f4bfsfvu137.us.auth0.com"
    clientId="VBcW25Uv57ldDvnlW0Q3euAxggYXTzg6"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </Auth0Provider>
);
