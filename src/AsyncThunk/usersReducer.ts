import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiRequestInstance from "../Service/apiRequests";

export const axiosGetUsers:any = createAsyncThunk(
    'users/axiosGetUsers',
    async (userName:string ) => {
        const res = await apiRequestInstance.getAllUsers(userName);
        return res;
});


export  const usersReducer = createSlice({
   name:'getUsers',
    initialState:{
        users:[],
        status:true,
    },
    reducers:{

    },
    extraReducers: {
        [axiosGetUsers.pending]: (state, action) => {
            state.status = true;
        },
        [axiosGetUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.status = false;
        },
        [axiosGetUsers.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default usersReducer.reducer;