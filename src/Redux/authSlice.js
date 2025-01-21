import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",

    initialState: {
      status: false,
      userData: null
    },
       
    reducers: {
        login : (state , action) => {
           state.status = true;
           console.log("in sslice ",action)
           state.userData = action.payload
        },
        logout : (state) => {
           state.status = false;
        }
    }

});
export const {login , logout} = authSlice.actions

export default authSlice.reducer