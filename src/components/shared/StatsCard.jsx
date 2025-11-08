import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(2),
  overflow: 'visible',
}));

const StatsCard = ({ title, icon, children }) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {icon && (
            <Box mr={1} display="flex" alignItems="center">
              {icon}
            </Box>
          )}
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default StatsCard;