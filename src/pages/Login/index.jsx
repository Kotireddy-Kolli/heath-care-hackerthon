import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async data => {
    try {
      const res = await fetch('http://localhost:4000/users');
      const users = await res.json();
      const user = users.find(
        u => u.email === data.email && u.password === data.password
      );
      if (!user) throw new Error('Invalid credentials');
      localStorage.setItem('token', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError('root', { message: err.message });
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Email"
          {...register('email', { required: 'Email is required',   pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          }, })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' , minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },})}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {errors.root && (
          <Typography color="error">{errors.root.message}</Typography>
        )}
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Login
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Link to="/register/internal">Register (Internal)</Link>
          <Link to="/register/external">Register (External)</Link>
        </Box>
        <Link
          to="/forgot-password"
          style={{ fontSize: 14, textAlign: 'center' }}
        >
          Forgot Password?
        </Link>
      </Box>
    </Paper>
  );
}
