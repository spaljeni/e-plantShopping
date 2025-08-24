import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // [{ name, image, cost, quantity }]
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existing = state.items.find((it) => it.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((it) => it.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((it) => it.name === name);
      if (!item) return;
      if (quantity <= 0) {
        // Ako padne na 0, izbaci iz košarice
        state.items = state.items.filter((it) => it.name !== name);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
