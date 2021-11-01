import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import githubServiceInstance from '../../service/github';

export const fetchUserRepos: any = createAsyncThunk(
  'userRepos/fetchUserRepos',
  async (obj: any, thunkAPI) => {
    const res: any = await githubServiceInstance.getUserRepos(obj);
    return res.data.items;
  },
);

export const userRepos = createSlice({
  name: 'userRepos',
  initialState: {
    repositories: [],
    isLoading: false,
  },
  reducers: {
    // todo  add clear arrray reducer
  },
  extraReducers: {
    [fetchUserRepos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserRepos.fulfilled]: (state, action) => {
      state.repositories = [...state.repositories, ...action.payload];
      // state.repositories.push(action.payload);
      // state.repositories = action.payload;
      state.isLoading = false;
    },
    [fetchUserRepos.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default userRepos.reducer;
