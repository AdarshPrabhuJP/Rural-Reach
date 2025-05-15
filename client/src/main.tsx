import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LanguageProvider } from "./context/LanguageContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="rural-india-theme">
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
