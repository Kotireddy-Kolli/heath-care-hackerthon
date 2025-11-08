import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching health data
export const fetchHealthData = createAsyncThunk(
  'health/fetchHealthData',
  async () => {
    // This would typically fetch from your API
    // Mocked data for demonstration
    return {
      steps: {
        current: 3620,
        goal: 6000,
        timestamp: new Date().toISOString(),
      },
      activeTime: {
        minutes: 56,
        goalMinutes: 60,
        calories: 1712,
        distance: 1.23,
        timestamp: new Date().toISOString(),
      },
      sleep: {
        hours: 6,
        minutes: 30,
        startTime: '23:30',
        endTime: '06:00',
        quality: [
          { type: 'deep', percentage: 30 },
          { type: 'light', percentage: 40 },
          { type: 'rem', percentage: 20 },
          { type: 'awake', percentage: 10 },
        ],
        timestamp: new Date().toISOString(),
      },
    };
  }
);

const initialState = {
  steps: {
    current: 0,
    goal: 6000,
    timestamp: null,
  },
  activeTime: {
    minutes: 0,
    goalMinutes: 60,
    calories: 0,
    distance: 0,
    timestamp: null,
  },
  sleep: {
    hours: 0,
    minutes: 0,
    startTime: '',
    endTime: '',
    quality: [],
    timestamp: null,
  },
  status: 'idle',
  error: null,
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    updateSteps: (state, action) => {
      state.steps = { ...state.steps, ...action.payload };
    },
    updateActiveTime: (state, action) => {
      state.activeTime = { ...state.activeTime, ...action.payload };
    },
    updateSleep: (state, action) => {
      state.sleep = { ...state.sleep, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealthData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHealthData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.steps = action.payload.steps;
        state.activeTime = action.payload.activeTime;
        state.sleep = action.payload.sleep;
      })
      .addCase(fetchHealthData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateSteps, updateActiveTime, updateSleep } = healthSlice.actions;

// Selectors
export const selectSteps = (state) => state.health.steps;
export const selectActiveTime = (state) => state.health.activeTime;
export const selectSleep = (state) => state.health.sleep;
export const selectHealthStatus = (state) => state.health.status;

export default healthSlice.reducer;