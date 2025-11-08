import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: '100%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
}));

const PreventiveCare = ({ reminders = [], onSendReminder }) => {
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSend = async reminder => {
    if (typeof onSendReminder === 'function') {
      try {
        await onSendReminder(reminder);
        setSnack({ open: true, message: 'Reminder sent', severity: 'success' });
      } catch (err) {
        setSnack({
          open: true,
          message: err.message || 'Failed to send reminder',
          severity: 'error',
        });
      }
    }
  };

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Preventive Care Reminders
      </Typography>
      <List>
        {reminders.map((reminder, index) => (
          <ListItem key={index} sx={{ px: 0, alignItems: 'center' }}>
            <ListItemIcon>
              <EventIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={reminder.title} secondary={reminder.date} />
            {onSendReminder && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleSend(reminder)}
              >
                Send Reminder
              </Button>
            )}
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack({ ...snack, open: false })}
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </StyledPaper>
  );
};

export default PreventiveCare;
