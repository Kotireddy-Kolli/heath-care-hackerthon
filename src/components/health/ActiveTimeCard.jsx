import { Box, Typography } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import { useSelector } from 'react-redux';
import { selectActiveTime } from '../../store/slices/healthSlice';
import StatsCard from '../shared/StatsCard';

const ActiveTimeCard = () => {
  const { minutes, goalMinutes, calories, distance } = useSelector(selectActiveTime);

  return (
    <StatsCard
      title="Active Time"
      icon={<TimerIcon color="primary" />}
    >
      <Box display="flex" alignItems="baseline" mb={2}>
        <Typography variant="h4" component="span" fontWeight="bold">
          {minutes}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          component="span"
          ml={1}
        >
          /{goalMinutes} mins
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        color="text.secondary"
      >
        <Typography variant="body2">
          {calories} Kcal | {distance.toFixed(2)}km
        </Typography>
      </Box>
    </StatsCard>
  );
};

export default ActiveTimeCard;