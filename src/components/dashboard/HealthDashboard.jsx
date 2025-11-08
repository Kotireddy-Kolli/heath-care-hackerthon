import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchHealthData } from '../../store/slices/healthSlice';
import StepsTracker from '../health/StepsTracker';
import ActiveTimeCard from '../health/ActiveTimeCard';
import SleepTracker from '../health/SleepTracker';

const HealthDashboard = ({ fullWidth = false }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHealthData());
  }, [dispatch]);

  return (
    <Container maxWidth={fullWidth ? false : 'sm'} disableGutters={fullWidth}>
      <Box py={3} px={fullWidth ? 0 : 2}>
        <StepsTracker />
        <ActiveTimeCard />
        <SleepTracker />
      </Box>
    </Container>
  );
};

export default HealthDashboard;