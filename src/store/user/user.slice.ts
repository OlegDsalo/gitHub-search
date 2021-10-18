import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import githubServiceInstance from "../../service/github";


export const fetchUser: any = createAsyncThunk(
    'user/fetchUser',
    async (userName: string) => await githubServiceInstance.getUser(userName)
    );


export const userReducer = createSlice({
    name: 'user',
    initialState: {
        user: [],
        isLoading: true,
    },
    reducers: {},
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        [fetchUser.rejected]: (state, action) => {
            state.isLoading = true;
        },
    },
});

export default userReducer.reducer;