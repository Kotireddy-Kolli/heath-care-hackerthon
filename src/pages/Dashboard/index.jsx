import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, Box, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import HealthDashboard from "../../components/dashboard/HealthDashboard";
import PreventiveCare from "../../components/dashboard/PreventiveCare";
import HealthTip from "../../components/dashboard/HealthTip";
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
}));

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const user = useSelector(state => state.user.currentUser);

  // Mock data - replace with actual API calls
  const preventiveCareReminders = [
    {
      title: "Upcoming Annual blood test",
      date: "23rd Jan 2025"
    },
    {
      title: "Dental Check-up",
      date: "15th Feb 2025"
    }
  ];

  const healthTip = "Stay hydrated! Aim to drink at least 8 glasses of water per day.";

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
    <Container maxWidth="lg">
      <Box sx={{ p: 4, mx: "auto", mt: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Welcome, {user?.name || 'Guest'}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* Wellness Goals: full-width */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Wellness Goals
          </Typography>
          <HealthDashboard fullWidth />
        </Box>

        <Grid container spacing={4}>
          {/* Patients (main) */}
          <Grid item xs={12} md={8}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Your Patients
              </Typography>
              <Grid container spacing={2}>
                {patients.map((p) => (
                  <Grid item xs={12} sm={6} key={p.id}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: '#f8f9fa',
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="medium">
                        {p.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {p.condition}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <PreventiveCare reminders={preventiveCareReminders} />
              </Grid>
              <Grid item xs={12}>
                <HealthTip tip={healthTip} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
