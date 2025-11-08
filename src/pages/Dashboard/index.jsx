import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HealthDashboard from "../../components/dashboard/HealthDashboard";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/patients")
      .then((res) => res.json())
      .then(setPatients);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Dashboard</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Patients:</Typography>
        {patients.map((p) => (
          <Typography key={p.id}>
            • {p.name} — {p.condition}
          </Typography>
        ))}
      </Box>
      <HealthDashboard />
    </Paper>
  );
}
