import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  // Auth state
  isAuthenticated: false,
  isLoading: false,
  setupComplete: false,
  error: null,

  // User data
  user: null,
  awsUser: null,
  thinkificUser: null,
  enrollments: [],
  userXp: {
    id: '',
    xpToNextLevel: 0,
    userXpUserId: '',
    totalXp: 0,
    thinkificXp: 0,
    psXp: 0,
    level: 0,
    lastLogin: '',
    dailyStreak: 0,
  },

  // Location
  location: {
    ip: null,
    city: null,
    region: null,
    country: null,
    lat: null,
    long: null,
  },

  // Cart
  cart: {
    id: null,
    items: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Auth state management
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },

    // User setup
    setUserSetupComplete: (state, action) => {
      state.setupComplete = action.payload;
      state.isLoading = false;
    },

    // User data
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.awsUser = null;
      state.thinkificUser = null;
      state.isAuthenticated = false;
      state.setupComplete = false;
      state.error = null;
    },

    // AWS and Thinkific users
    setAWSUser: (state, action) => {
      state.awsUser = action.payload;
      if (action.payload?.userXp) {
        state.userXp = action.payload.userXp;
      }
    },
    setThinkificUser: (state, action) => {
      state.thinkificUser = action.payload;
    },
    updateUser: (state, action) => {
      state.awsUser = { ...state.awsUser, ...action.payload };
    },

    // Enrollments
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },

    // User XP
    setUserXp: (state, action) => {
      state.userXp = action.payload;
    },

    // Location
    setLocation: (state, action) => {
      state.location.ip = action.payload.ip;
      state.location.city = action.payload.city ?? null;
      state.location.region = action.payload.region ?? null;
      state.location.country = action.payload.country;
      state.location.lat = action.payload.lat;
      state.location.long = action.payload.long;
    },

    // Cart management
    addToCart: (state, action) => {
      if (!state.cart.id) {
        state.cart.id = uuidv4();
      }
      state.cart.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart.items = state.cart.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.cart.items = [];
      state.cart.id = null;
    },
    setCartId: (state, action) => {
      state.cart.id = action.payload;
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cart.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.cart.items[itemIndex].quantity = quantity;
      }
    },
  },
});

export const {
  setAuthLoading,
  setAuthError,
  clearAuthError,
  setUserSetupComplete,
  setUser,
  clearUser,
  setAWSUser,
  setThinkificUser,
  updateUser,
  setEnrollments,
  setUserXp,
  setLocation,
  addToCart,
  removeFromCart,
  setCartId,
  updateCartItemQuantity,
  clearCart,
} = authSlice.actions;

export default authSlice.reducer;
