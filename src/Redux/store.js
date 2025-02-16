import { configureStore } from "@reduxjs/toolkit";

import authReducer from './authSlice.js'
import sideBarReducer from './sideBarSlice.js'

export const store = configureStore({
    reducer: {
       auth: authReducer,
       sideBar: sideBarReducer
    }
})