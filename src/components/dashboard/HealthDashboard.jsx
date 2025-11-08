import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchHealthData } from '../../store/slices/healthSlice';
import StepsTracker from '../health/StepsTracker';
import ActiveTimeCard from '../health/ActiveTimeCard';
import SleepTracker from '../health/SleepTracker';

const HealthDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHealthData());
  }, [dispatch]);

  return (
    <Container maxWidth="sm">
      <Box py={3}>
        <StepsTracker />
        <ActiveTimeCard />
        <SleepTracker />
      </Box>
    </Container>
  );
};

export default HealthDashboard;