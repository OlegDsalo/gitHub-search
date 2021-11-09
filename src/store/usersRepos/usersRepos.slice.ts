import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import githubServiceInstance from '../../service/github';

export const fetchUsersRepos: any = createAsyncThunk(
  'usersRepo/fetchUsersRepos',
  async (data: any) => {
    const res:any = await githubServiceInstance.getAllUsersRepos(data);
    return res;
  },
);

export const usersRepos = createSlice({
  name: 'usersRepos',
  initialState: {
    repositories: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: {
    [fetchUsersRepos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUsersRepos.fulfilled]: (state, action) => {
      state.repositories = action.payload;
      state.isLoading = false;
    },
    [fetchUsersRepos.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default usersRepos.reducer;
