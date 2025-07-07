import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './layout/layoutSlice';
import navReducer from './navigation/navigationSlice';
import courseFilterReducer from './all_courses/courseFilterSlice';
import authslice from './auth/authslice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    layout: layoutReducer,
    course_filter: courseFilterReducer,
    auth: authslice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
