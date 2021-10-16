import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiRequestInstance from "../Service/apiRequests";


export const axiosGetUsersRepo:any = createAsyncThunk(
    'usersRepo/axiosGetUsersRepo',
    async (users:string ) => {
        const res = await apiRequestInstance.getAllUsersRepos(users);
        return res;
    });


export  const usersRepoReducer = createSlice({
    name:'getUsers',
    initialState:{
        usersRepo:[],
        status:true,
    },
    reducers:{

    },
    extraReducers: {
        [axiosGetUsersRepo.pending]: (state, action) => {
            state.status = true;
        },
        [axiosGetUsersRepo.fulfilled]: (state, action) => {
            state.usersRepo = action.payload;
            state.status = false;
        },
        [axiosGetUsersRepo.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default usersRepoReducer.reducer;