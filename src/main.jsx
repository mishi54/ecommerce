import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from './components/AuthContext';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
        <App />
        </AuthProvider>
    </Provider>
  </React.StrictMode>
);