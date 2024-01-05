import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import exampleSlice from '../features/example/slice'

export const store = configureStore({
  reducer: {
    // global slice
    app: appSlice,

    // example slice
    example: exampleSlice

    // set other slice
  }
})
