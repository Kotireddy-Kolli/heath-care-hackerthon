import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DashboardBreadcrumb from '../../components/Breadcrumb';

export default function Profile() {
  const [user, setUser] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem('token'));

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: '',
      age: '',
      allergies: [],
      medications: [],
      goals: { water: '', sleep: '', steps: '' },
    },
  });

  const allergiesArray = useFieldArray({ control, name: 'allergies' });
  const medsArray = useFieldArray({ control, name: 'medications' });

  // Fetch user profile
  useEffect(() => {
    if (!storedUser?.id) return;
    fetch(`http://localhost:4000/patients`)
      .then(res => res.json())
      .then(data => {
        setUser(data.find(user => user.id === storedUser?.id));
      });
  }, []);

  const onSubmit = async data => {
    await fetch(`http://localhost:4000/patients`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    alert('Profile updated successfully!');
  };

  if (!user) return <Typography align="center">Loading...</Typography>;

  return (
    <Paper sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom align="center">
        Profile Settings
      </Typography>
      <DashboardBreadcrumb />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        {/* --- BASIC INFO --- */}
        <Box>
          <Typography variant="h6">Personal Info</Typography>
          <Stack spacing={2} mt={1}>
            <TextField value={user.name} label="Name" {...register('name')} />
            <TextField label="Age" type="number" {...register('age')} />
            <TextField label="Email" value={user.email} disabled />
          </Stack>
        </Box>

        <Divider />

        {/* --- ALLERGIES --- */}
        <Box>
          <Typography variant="h6">Allergies</Typography>
          <Stack spacing={1} mt={1}>
            {allergiesArray.fields.map((field, index) => (
              <Box key={field.id} display="flex" alignItems="center" gap={1}>
                <TextField
                  fullWidth
                  {...register(`allergies.${index}`)}
                  placeholder="Allergy"
                />
                <IconButton
                  color="error"
                  onClick={() => allergiesArray.remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={() => allergiesArray.append('')}
            >
              Add Allergy
            </Button>
          </Stack>
        </Box>

        <Divider />

        {/* --- MEDICATIONS --- */}
        <Box>
          <Typography variant="h6">Medications</Typography>
          <Stack spacing={1} mt={1}>
            {medsArray.fields.map((field, index) => (
              <Box key={field.id} display="flex" alignItems="center" gap={1}>
                <TextField
                  fullWidth
                  {...register(`medications.${index}`)}
                  placeholder="Medication"
                />
                <IconButton
                  color="error"
                  onClick={() => medsArray.remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={() => medsArray.append('')}
            >
              Add Medication
            </Button>
          </Stack>
        </Box>

        <Divider />

        {/* --- GOALS --- */}
        <Box>
          <Typography variant="h6">Wellness Goals</Typography>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Daily Water Intake (cups)"
              type="number"
              {...register('goals.water')}
            />
            <TextField
              label="Sleep Target (hours)"
              type="number"
              {...register('goals.sleep')}
            />
            <TextField
              label="Steps Target"
              type="number"
              {...register('goals.steps')}
            />
          </Stack>
        </Box>

        <Divider />

        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
}
