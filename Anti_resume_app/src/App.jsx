// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ChallengePage from "./pages/ChallengePage";
import SubmitSuccess from "./pages/SubmitSuccess";
import ViewCandidates from "./pages/ViewCandidates";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/view-candidates/:skill"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <ViewCandidates />
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
