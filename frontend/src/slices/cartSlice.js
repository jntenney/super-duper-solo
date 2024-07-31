import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartInfo: localStorage.getItem('cartInfo') ? JSON.parse(localStorage.getItem('cartInfo')) : null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartInfo = action.payload;
      localStorage.setItem('cartInfo', JSON.stringify(action.payload));
    },
    // eslint-disable-next-line no-unused-vars
    removeCart: (state, action) => {
      state.cartInfo = null;
      localStorage.removeItem('cartInfo');
    },
  },
});

export const { setCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
