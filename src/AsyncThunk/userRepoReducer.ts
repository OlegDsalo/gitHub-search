import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiRequestInstance from "../Service/apiRequests";


export const axiosGetUserRepo:any = createAsyncThunk(
    'user/axiosGetUserRepo',
    async (login:string ) => {
        const res = await apiRequestInstance.getUserRepos(login);
        return res;
    });


export  const userReducerRepo = createSlice({
    name:'getUsers',
    initialState:{
        userRepo:[],
        status:true,
    },
    reducers:{

    },
    extraReducers: {
        [axiosGetUserRepo.pending]: (state, action) => {
            state.status = true;
        },
        [axiosGetUserRepo.fulfilled]: (state, action) => {
            state.userRepo = action.payload;
            state.status = false;
        },
        [axiosGetUserRepo.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default userReducerRepo.reducer;