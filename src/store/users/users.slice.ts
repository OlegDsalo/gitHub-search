import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import githubServiceInstance from '../../service/github';

export const fetchUsers: any = createAsyncThunk(
  'Users/fetchUsers',
  async (userName: string) => {
    const res: any = await githubServiceInstance.getAllUsers(userName);
    return res.data.items;
  },
);

export const users = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default users.reducer;
