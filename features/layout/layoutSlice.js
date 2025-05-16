import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  isFixed: false,
  signInModal: false,
  indiaBanner: true,
  advisorModal: false,
  salesbarText: 'Questions? Book a free 15-minute call with an advisor.',
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setDark: (state) => {
      state.darkMode = true;
    },
    setLight: (state) => {
      state.darkMode = false;
    },
    setFixed: (state) => {
      state.isFixed = true;
    },
    setUnfixed: (state) => {
      state.isFixed = false;
    },
    toggleSignInModal: (state) => {
      state.signInModal = !state.signInModal;
    },
    toggleIndiaBanner: (state) => {
      state.indiaBanner = !state.indiaBanner;
    },
    toggleAdvisorModal: (state) => {
      state.advisorModal = !state.advisorModal;
    },
    setSalesbarText: (state, action) => {
      state.salesbarText = action.payload;
    },
  },
});

export const {
  setDark,
  setLight,
  setFixed,
  setUnfixed,
  toggleSignInModal,
  toggleIndiaBanner,
  toggleAdvisorModal,
  setSalesbarText,
} = layoutSlice.actions;

export default layoutSlice.reducer;
