import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import githubServiceInstance from '../../service/github';

export const fetchUsers: any = createAsyncThunk(
  'Users/fetchUsers',
  async (obj) => {
    const res: any = await githubServiceInstance.getAllUsers(obj);
    return res.data;
  },
);

export const users = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isLoading: false,
    currentPage: 1,
    totalCount: 0,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.data = action.payload.items;
      state.isLoading = false;
      state.totalCount = action.payload.total_count;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default users.reducer;

export const { setCurrentPage } = users.actions;
