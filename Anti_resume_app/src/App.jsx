// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChallengePage from "./components/ChallengePage";
import StudentProfile from "./components/StudentProfile";
import EmployeeDashboard from "./components/EmployeeDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentProfile />} />
        <Route path="/challenge/:paperId" element={<ChallengePage />} />
        <Route path="/employer" element={<EmployeeDashboard/>} />
      </Routes>
    </Router>
  );
}
