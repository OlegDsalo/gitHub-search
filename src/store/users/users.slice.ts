import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import githubServiceInstance from "../../service/github";

export const fetchUsers: any = createAsyncThunk(
    'Users/fetchUsers',
    async (userName: string) => {
        const res: any = await githubServiceInstance.getAllUsers(userName);
        return res.items;
    });


export const usersReducer = createSlice({
    name: 'users',
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
            state.status = false;
        },
    },
});

export default usersReducer.reducer;

