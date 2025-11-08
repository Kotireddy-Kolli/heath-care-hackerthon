import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

export default function RegisterExternal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type: "external" }),
    });
    navigate("/login");
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        External Registration
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          {...register("email", { required: "Email required" })}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", {
            required: "Password required",
            minLength: 6,
          })}
        />
        <TextField
          label="Company Name"
          {...register("company", { required: "Company required" })}
        />
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Box>
    </Paper>
  );
}
