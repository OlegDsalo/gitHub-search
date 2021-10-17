import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiRequestInstance from "../service/apiRequests";


export const fetchUsersRepos:any = createAsyncThunk(
    'usersRepo/fetchUsersRepos',
    async (users:any ) => {
        const res = await apiRequestInstance.getAllUsersRepos(users);
        return res;
    });


export  const usersRepos = createSlice({
    name:'getUsers',
    initialState:{
        usersRepos:[],
        status:true,
    },
    reducers:{

    },
    extraReducers: {
        [fetchUsersRepos.pending]: (state, action) => {
            state.status = true;
        },
        [fetchUsersRepos.fulfilled]: (state, action) => {
            state.usersRepos = action.payload;
            state.status = false;
        },
        [fetchUsersRepos.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default usersRepos.reducer;