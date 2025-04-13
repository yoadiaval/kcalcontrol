import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { PersonalInfoProvider } from "./context/personalInfoContex.jsx";
import { CentralProvider } from "./context/centralContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PersonalInfoProvider>
        <CentralProvider>
          <App />
        </CentralProvider>
      </PersonalInfoProvider>
    </AuthProvider>
  </StrictMode>
);
