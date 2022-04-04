import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  LOGIN_URL, REFRESH_JWT_TOKEN_URL} from "../../../config/config";
import axios from "axios";



export const getTokens = createAsyncThunk(
    "userData/getTokens",
    async ({username, password}, {dispatch}) => {
        const response = await fetch(LOGIN_URL, 
            {
                method:"POST",
                body: JSON.stringify({
                    username, 
                    password
                })
            }).catch(e=>console.log(e));
            
    return Object.values(await response.json());
    }
);
export const refreshTokens = createAsyncThunk(
    "userData/refreshTokens",
    async (firstArg, { dispatch, getState }) => {

        const { jwt } = getState();
        const refreshToken = jwt.value.refreshToken;
        // console.log(jwt_decode(accessToken))
        // console.log("decoded")
        
        const res = await axios.get(REFRESH_JWT_TOKEN_URL, {
            headers: {
                "Authorization": "Bearer " + refreshToken,
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/json'
            }}).catch(e=>console.log(e));
        return res.data;
    }
);


export const jwtSlice = createSlice ({
    name: "jwt",
    initialState: { value: {accessToken: null, refreshToken: null}},
    reducers: {
        clearTokens: (state) => {
            state.value.accessToken = null
            state.value.refreshToken = null
        },
        
    },
    extraReducers: {
        [getTokens.pending]:(state) => {
            state.status = "loading"
        },
        [getTokens.fulfilled]: (state, {payload}) => {
            state.value.accessToken = payload[0]
            state.value.refreshToken = payload[1]
            state.status = "success"
        },
        [getTokens.rejected]: (state) => {
            state.status = "failed"
        },

        [refreshTokens.pending]:(state) => {
            state.status = "loading"
        },
        [refreshTokens.fulfilled]: (state, {payload}) => {
            state.value.accessToken = payload.access_token
            state.value.refreshToken = payload.refresh_token
            state.status = "success"
        },
        [refreshTokens.rejected]: (state) => {
            state.status = "failed"
        }
    }
}) 
export const { clearTokens } = jwtSlice.actions;
export default jwtSlice.reducer;