import {createSlice} from "@reduxjs/toolkit";

const tokenAuthSlice = createSlice({
    name: 'tokenAuth',
    initialState: {
        token:null,
    },
    reducers : {
        setToken: (state,action) => {
            state.token = action.payload;
        },
        clearToken:(state) => {
            state.token = "";
        },
    },
});

export const {setToken,clearToken} = tokenAuthSlice.actions
export default tokenAuthSlice.reducer