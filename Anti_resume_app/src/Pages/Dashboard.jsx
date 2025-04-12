import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (role === "candidate") {
      navigate("/candidate-dashboard");
    } else if (role === "company") {
      navigate("/company-dashboard");
    }
  }, [user, role, navigate]);

  return <div>Loading...</div>;
}

export default Dashboard;
