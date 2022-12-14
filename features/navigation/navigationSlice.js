import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileMenuOpen: false,
  searchOpen: false,
  sectionInView: '',
  darkHeader: true,
  menuItemOpen: false,
  menuItem: null,
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
} = navSlice.actions;

export default navSlice.reducer;
