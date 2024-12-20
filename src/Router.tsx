import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import Dashboard from "@/components/Dashboard";
import Settings from "./pages/Settings";
import AuthCallback from "./pages/AuthCallback";
import PaymentSuccess from './pages/PaymentSuccess';
import Editor from './pages/Editor';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
}
