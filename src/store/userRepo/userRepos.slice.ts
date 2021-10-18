import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import githubServiceInstance from "../../service/github";


export const fetchUserRepos: any = createAsyncThunk(
    'userRepos/fetchUserRepos',
    async (obj: any, thunkAPI) => {
        const res: any = await githubServiceInstance.getUserRepos(obj);
        return res.items;
    });


export const userReposReducer = createSlice({
    name: 'userRepos',
    initialState: {
        userRepos: [],
        isLoaded: true,
    },
    reducers: {},
    extraReducers: {
        [fetchUserRepos.pending]: (state, action) => {
            state.isLoaded = true;
        },
        [fetchUserRepos.fulfilled]: (state, action) => {
            state.userRepos = action.payload;
            state.isLoaded = false;
        },
        [fetchUserRepos.rejected]: (state, action) => {
            state.isLoaded = true;
        },
    },
});

export default userReposReducer.reducer;