// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CandidateDashboard from "./Pages/CandidateDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ChallengePage from "./pages/ChallengePage";
import SubmitSuccess from "./pages/SubmitSuccess";

import CompanyDashboard from "./Pages/CompanyDashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/submit-success"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <SubmitSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidate-dashboard"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company-dashboard"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["candidate", "company"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenge/:id"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <ChallengePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submit-success"
          element={
            <ProtectedRoute>
              <SubmitSuccess />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
