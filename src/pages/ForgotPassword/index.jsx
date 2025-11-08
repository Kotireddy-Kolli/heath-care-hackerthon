import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => alert(`Reset link sent to ${data.email}`);

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Email"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Button type="submit" variant="contained">
          Send Reset Link
        </Button>
      </Box>
    </Paper>
  );
}
