import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import { ThemeContextProvider } from "./contexts/ThemeContext/ThemeContext.tsx";
import { SidenavContextProvider } from "./contexts/SidenavContext/SidenavContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <SidenavContextProvider>
        <App />
      </SidenavContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
