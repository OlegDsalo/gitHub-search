import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import githubServiceInstance from "../service/github";

export const fetchUsers: any = createAsyncThunk(
    'users/fetchUsers',
    async (userName: string) => {
        const res: any = await githubServiceInstance.getAllUsers(userName);
        return res.items;
    });


export const usersReducer = createSlice({
    name: 'getUsers',
    initialState: {
        users: [],
        status: true,
    },
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.status = false;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default usersReducer.reducer;