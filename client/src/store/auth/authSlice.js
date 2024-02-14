import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./authThunk";
import axios from "axios";

export const getRoles=createAsyncThunk(
    "get",async()=>{
        const res=await axios.get("http://localhost:5000/roles")
        return res.data
    }
)

export const authSlice= createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
        roles:[]
    },
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.token = action.payload;
        },
        setRole: (state, action) => {
            localStorage.setItem('role', action.payload);
            state.role = action.payload;
        }
    },
    extraReducers:(build)=>{
       build.addCase(
        loginThunk.pending,(state,action)=>{

        },
        
        loginThunk.fulfilled,(state,action)=>{
            localStorage.setItem('token', action.payload.token);
            state.token = action.payload.token;
            localStorage.setItem('role', action.payload);
            state.role = action.payload;
        },

        loginThunk.rejected,(state,action)=>{

        }
       )
       build.addCase(getRoles.fulfilled,(state,action)=>{
        state.roles=action.payload;
       })
    }
})