import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Templates from "./pages/Templates";
import Tutorials from "./pages/Tutorials";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import Dashboard from "@/components/Dashboard";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/tutorials" element={<Tutorials />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/editor" element={<Dashboard />} />
    </Routes>
  );
}
