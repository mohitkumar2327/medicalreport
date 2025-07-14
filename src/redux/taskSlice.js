import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API calls
const fetchTasksApi = async () => {
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ]);
    }, 1000);
  });
};

const addTaskApi = async (task) => {
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...task, completed: false });
    }, 1000);
  });
};

// Async thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetchTasksApi();
  return response;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await addTaskApi(task);
  return response;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export default taskSlice.reducer;