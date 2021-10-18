import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import githubServiceInstance from "../service/github";


export const fetchUsersRepos: any = createAsyncThunk(
    'usersRepo/fetchUsersRepos',
    async (users: any) => {
        const res = await githubServiceInstance.getAllUsersRepos(users);
        return res;
    });


export const usersRepos = createSlice({
    name: 'getUsers',
    initialState: {
        usersRepos: [],
        status: true,
    },
    reducers: {},
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