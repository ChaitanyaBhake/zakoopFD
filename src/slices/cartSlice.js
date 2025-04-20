import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      // Check if product already exists in cart
      const existingProduct = state.cartItems.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }

      // Update total quantity and amount
      state.totalQuantity++;
      state.totalAmount += product.price;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === productId
      );

      if (productIndex !== -1) {
        const product = state.cartItems[productIndex];
        state.totalQuantity -= product.quantity;
        state.totalAmount -=
          product.price * product.quantity;
        state.cartItems.splice(productIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { productId, change } = action.payload;
      const product = state.cartItems.find(
        (item) => item._id === productId
      );

      if (product) {
        const newQuantity = product.quantity + change;

        if (newQuantity <= 0) {
          // If quantity is 0 or less, remove the product from the cart
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== productId
          );
          state.totalQuantity -= product.quantity;
          state.totalAmount -=
            product.price * product.quantity;
        } else {
          // Otherwise, update the quantity
          product.quantity = newQuantity;
          state.totalQuantity += change;
          state.totalAmount += product.price * change;
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
