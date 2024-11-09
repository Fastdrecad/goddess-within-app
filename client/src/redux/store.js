import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "@/redux/slices/apiSlice";
import cartSliceReducer from "@/redux/slices/cartSlice";
import authSliceReducer from "@/redux/slices/authSlice";
import wishlistSliceReducer from "@/redux/slices/wishlistSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    wishlist: wishlistSliceReducer,
    auth: authSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store;
