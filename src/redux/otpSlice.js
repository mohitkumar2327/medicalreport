import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call for OTP verification
const verifyOtpApi = async (otp) => {
  // Replace this with your actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === '123456') { // Example OTP
        resolve({ success: true });
      } else {
        reject(new Error('Invalid OTP'));
      }
    }, 1000);
  });
};

export const verifyOtp = createAsyncThunk(
  'otp/verify',
  async (otp, { rejectWithValue }) => {
    try {
      const response = await verifyOtpApi(otp);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    isVerified: false,
    error: null,
    loading: false,
  },
  reducers: {
    resetOtpState: (state) => {
      state.isVerified = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isVerified = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;