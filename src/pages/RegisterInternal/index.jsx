import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

export default function RegisterInternal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type: "internal" }),
    });
    navigate("/login");
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Internal Registration
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Work Email"
          {...register("email", { required: "Email required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
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
          label="Employee ID"
          {...register("employeeId", { required: "Employee ID required" })}
        />
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Box>
    </Paper>
  );
}
