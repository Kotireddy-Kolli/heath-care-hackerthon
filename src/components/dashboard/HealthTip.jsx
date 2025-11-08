import { Paper, Typography, Box } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: '100%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
}));

const HealthTip = ({ tip }) => {
  return (
    <StyledPaper>
      <Box display="flex" alignItems="center" mb={2}>
        <LightbulbIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">
          Health Tip of the Day
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">
        {tip}
      </Typography>
    </StyledPaper>
  );
};

export default HealthTip;