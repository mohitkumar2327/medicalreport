import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';
import otpReducer from './redux/otpSlice';
import taskReducer from './redux/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    otp: otpReducer,
    tasks: taskReducer,
  },
});
