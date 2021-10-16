import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiRequestInstance from "../Service/apiRequests";


export const axiosGetUser:any = createAsyncThunk(
    'user/axiosGetUser',
    async (login:string ) => {
        const res = await apiRequestInstance.getUser(login);
        return res;
    });


export  const userReducer = createSlice({
    name:'getUsers',
    initialState:{
        user:[],
        isLoading:true,
    },
    reducers:{

    },
    extraReducers: {
        [axiosGetUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [axiosGetUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        [axiosGetUser.rejected]: (state, action) => {
            state.isLoading = true;
        },
    },
});

export default userReducer.reducer;