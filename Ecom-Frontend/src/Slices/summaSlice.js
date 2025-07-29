import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url="http://localhost:3000"
export const login=createAsyncThunk(
    "user/login",
    async({userId,username},{rejectWithValue})=>
    {
        try
        {
            const res=await axios.post(`${url}/auth/login`,
                {userId,username}
            )
        return res.data;
        }
        catch(error)
        {
            const message=error.response?.data?.message||error.message
            return rejectWithValue(message)
        }
    }
)


const userSlices=createSlice(
    {
        name:"user",
        initialState:
        {
            isLoading:false,
            isAuth:false,
            username:"",
            userId:"",
            users:[],
            error:""
        },
        reducers:
        {
            logout:(state)=>
            {
                state.isLoading=false,
                state.isAuth=false,
                state.users=[],
                state.error=""
            }
        },
        extraReducers :(builder)=>
        {
            builder
            .addCase(login.pending,(state)=>
            {
                state.isAuth=false;
                state.isLoading=true
            })
            .addCase(login.fulfilled,(state,action)=>
            {
                state.isLoading=false
                state.isAuth=true;
                state.users=action.payload;
                state.username=action.payload.username;
                state.error=""
            })
            .addCase(login.rejected,(state,action)=>
            {
                state.error=action.payload;
                state.isAuth=false;
            });


        }
    })
    export const{logout}=userSlices.actions;
    export const userReducer=userSlices.reducer
