import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: '100%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
}));

const PreventiveCare = ({ reminders = [] }) => {
  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Preventive Care Reminders
      </Typography>
      <List>
        {reminders.map((reminder, index) => (
          <ListItem key={index} sx={{ px: 0 }}>
            <ListItemIcon>
              <EventIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={reminder.title}
              secondary={reminder.date}
            />
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default PreventiveCare;