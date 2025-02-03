import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignup/LoginSignupPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
      </Routes>
    </Router>
  );
}