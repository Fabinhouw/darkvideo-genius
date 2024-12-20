import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Router } from "./Router";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;