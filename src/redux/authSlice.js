import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Mock user database
let users = [];

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      // Check if email already exists
      if (users.some(user => user.email === userData.email)) {
        throw new Error('Email already exists. Please use a different email.');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add user to mock database
      users.push(userData);
      
      return { user: { name: userData.name, email: userData.email }, signupData: userData };
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred during signup.')
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists and password matches
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
      
      if (user) {
        return { user: { name: user.name, email: user.email } };
      } else {
        throw new Error(
          'Invalid email or password. Please sign up if you don\'t have an account.'
        );
      }
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred during login.')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    signupData: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.signupData = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.signupData = action.payload.signupData;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;