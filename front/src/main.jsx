import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { PersonalInfoProvider } from "./context/personalInfoContex.jsx";
import { ComputoProvider } from "./context/computoContext.jsx";
import { CentralProvider } from "./context/centralContext.jsx";
import FoodCombinedProvider from "./foodCombinedProviders.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PersonalInfoProvider>
        <FoodCombinedProvider>
          <ComputoProvider>
            <CentralProvider>
              <App />
            </CentralProvider>
          </ComputoProvider>
        </FoodCombinedProvider>
      </PersonalInfoProvider>
    </AuthProvider>
  </StrictMode>
);
