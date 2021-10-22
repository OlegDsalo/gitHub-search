import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import githubServiceInstance from '../../service/github';

export const fetchUser:any = createAsyncThunk(
  'User/fetchUser',
  async (userName: string) => {
    const res = await githubServiceInstance.getUser(userName);
    return res.data;
  },
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
      state.isLoading = false;
    },
  },
});

export default userReducer.reducer;
