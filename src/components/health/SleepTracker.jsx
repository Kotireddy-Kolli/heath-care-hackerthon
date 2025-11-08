import { Box, Typography } from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useSelector } from 'react-redux';
import { selectSleep } from '../../store/slices/healthSlice';
import StatsCard from '../shared/StatsCard';

const SleepQualityBar = ({ quality }) => {
  const colors = {
    deep: '#4CAF50',
    light: '#2196F3',
    rem: '#FFC107',
    awake: '#FF5722',
  };

  return (
    <Box display="flex" height={8} borderRadius={4} overflow="hidden">
      {quality.map((segment, index) => (
        <Box
          key={index}
          sx={{
            width: `${segment.percentage}%`,
            bgcolor: colors[segment.type],
            height: '100%',
          }}
        />
      ))}
    </Box>
  );
};

const SleepTracker = () => {
  const { hours, minutes, startTime, endTime, quality } =
    useSelector(selectSleep);

  return (
    <StatsCard title="Sleep" icon={<BedtimeIcon color="primary" />}>
      <Box display="flex" alignItems="baseline" mb={2}>
        <Typography variant="h4" component="span" fontWeight="bold">
          {hours}
        </Typography>
        <Typography variant="h5" component="span" ml={1}>
          hrs
        </Typography>
        <Typography variant="h4" component="span" fontWeight="bold" ml={1}>
          {minutes}
        </Typography>
        <Typography variant="h5" component="span" ml={1}>
          mins
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="body2" color="text.secondary">
          {startTime} - {endTime}
        </Typography>
      </Box>
      <SleepQualityBar quality={quality} />
    </StatsCard>
  );
};

export default SleepTracker;
