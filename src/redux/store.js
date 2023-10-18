import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slices/counter/counterSlice.js"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})