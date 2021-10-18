import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import githubServiceInstance from "../service/github";


export const fetchUserRepos: any = createAsyncThunk(
    'userRepos/fetchUserRepos',
    async (obj: any, thunkAPI) => {
        const res: any = await githubServiceInstance.getUserRepos(obj);
        return res.items;
    });


export const userReposReducer = createSlice({
    name: 'getUserCorectRepo',
    initialState: {
        userRepos: [],
        isLoading: true,
    },
    reducers: {},
    extraReducers: {
        [fetchUserRepos.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchUserRepos.fulfilled]: (state, action) => {
            state.userRepos = action.payload;
            state.isLoading = false;
        },
        [fetchUserRepos.rejected]: (state, action) => {
            state.isLoading = true;
        },
    },
});

export default userReposReducer.reducer;