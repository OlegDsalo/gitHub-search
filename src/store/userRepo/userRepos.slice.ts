import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import githubServiceInstance from '../../service/github';

export const fetchUserRepos: any = createAsyncThunk(
  'userRepos/fetchUserRepos',
  async (obj: any, thunkAPI) => {
    const res: any = await githubServiceInstance.getUserRepos(obj);
    return res.data;
  },
);

export const userRepos = createSlice({
  name: 'userRepos',
  initialState: {
    repositories: [],
    isLoading: true,
    totalCount: 0,
    repoPage: 1,
  },
  reducers: {
    setRepoPage(state, action) {
      state.repoPage = action.payload;
    },
    clearRepositories(state) {
      state.repoPage = 1;
      state.repositories = [];
      state.isLoading = true;
    },
  },
  extraReducers: {
    [fetchUserRepos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserRepos.fulfilled]: (state, action) => {
      state.repositories = [...state.repositories, ...action.payload.items];
      state.isLoading = false;
      state.totalCount = action.payload.total_count;
    },
    [fetchUserRepos.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default userRepos.reducer;

export const { clearRepositories, setRepoPage } = userRepos.actions;
