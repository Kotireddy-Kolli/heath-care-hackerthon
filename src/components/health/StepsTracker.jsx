import { Box, LinearProgress, Typography, Chip } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { useSelector } from 'react-redux';
import { selectSteps } from '../../store/slices/healthSlice';
import StatsCard from '../shared/StatsCard';

const StepsTracker = () => {
  const { current, goal } = useSelector(selectSteps);
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <StatsCard title="Steps" icon={<DirectionsWalkIcon color="primary" />}>
      <Box display="flex" alignItems="baseline" mb={1}>
        <Typography variant="h4" component="span" fontWeight="bold">
          {current.toLocaleString()}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          component="span"
          ml={1}
        >
          /{goal.toLocaleString()} steps
        </Typography>
        <Box ml={2}>
          {progress >= 100 ? (
            <Chip label="Goal met" color="success" size="small" />
          ) : (
            <Chip label={`${Math.round(progress)}%`} size="small" />
          )}
        </Box>
      </Box>
      <Box position="relative" mt={2}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#ff7c7c',
              borderRadius: 5,
            },
          }}
        />
        <Box
          position="absolute"
          right={0}
          top={-20}
          sx={{
            backgroundColor: '#666',
            color: '#fff',
            padding: '2px 6px',
            borderRadius: 1,
            fontSize: '0.75rem',
          }}
        >
          Now
        </Box>
      </Box>
    </StatsCard>
  );
};

export default StepsTracker;
