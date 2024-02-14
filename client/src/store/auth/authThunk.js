import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
   'authThunk',
     async (credentials,{rejectWithValue}) => {
        try {
           const res = await axios.post('http://localhost:5000/auth/login',credentials) 
           return res.data
        } catch (error) {
           return rejectWithValue(error.response)
            
        }
       
    }
)


export const registerThunk = createAsyncThunk(
    'registerThunk',
    async(credentials, {rejectWithValue})=>{
     try{
       const res = await axios.post('http://localhost:5000/auth/signup', credentials)
       return res.data
     }catch(error){
      return rejectWithValue(erreur.response)
     }
    })
