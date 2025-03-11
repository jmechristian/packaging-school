import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileMenuOpen: false,
  searchOpen: false,
  sectionInView: '',
  darkHeader: true,
  menuItemOpen: false,
  menuItem: null,
  showToast: false,
  toast: {
    message: '',
    type: '',
    description: '',
  },
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    showMobileMenu: (state) => {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    showSearch: (state) => {
      state.searchOpen = true;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    setSectionInView: (state, action) => {
      state.sectionInView = action.payload;
    },
    setDarkHeader: (state, action) => {
      state.darkHeader = action.payload;
    },
    setMenuItem: (state) => {
      state.menuItemOpen = !state.menuItemOpen;
    },
    setSelectedNav: (state, action) => {
      state.menuItem = action.payload;
    },
    showToast: (state, action) => {
      state.toast = action.payload;
      state.showToast = true;
    },
    hideToast: (state) => {
      state.showToast = false;
    },
  },
});

export const {
  showMobileMenu,
  closeMobileMenu,
  showSearch,
  closeSearch,
  setSectionInView,
  setDarkHeader,
  setMenuItem,
  setSelectedNav,
  showToast,
  hideToast,
} = navSlice.actions;

export default navSlice.reducer;
