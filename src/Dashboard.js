import React from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>This is Dashboard</h1>
      <h2>{`Welcome ${location?.state?.username}`}</h2>
    </div>
  );
}

export default Dashboard;
