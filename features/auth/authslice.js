import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  user: null,
  loginOpen: true,
  location: {
    ip: null,
    country: null,
    lat: null,
    long: null,
  },
  cart: {
    id: null,
    items: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    toggleLogin: (state) => {
      state.loginOpen = !state.loginOpen;
    },
    setLocation: (state, action) => {
      state.location.ip = action.payload.ip;
      state.location.country = action.payload.country;
      state.location.lat = action.payload.lat;
      state.location.long = action.payload.long;
    },
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
  setUser,
  clearUser,
  toggleLogin,
  setLocation,
  addToCart,
  removeFromCart,
  setCartId,
  updateCartItemQuantity,
  clearCart,
} = authSlice.actions;

export default authSlice.reducer;
