import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiRequestInstance from "../service/apiRequests";


export const fetchUserRepos:any = createAsyncThunk(
    'userRepos/fetchUserRepos',
    async (obj:any,thunkAPI) => {
        const res:any = await apiRequestInstance.getUserRepos(obj);
        return res.items;
    });


export  const userReposReducer = createSlice({
    name:'getUserCorectRepo',
    initialState:{
        userRepos:[],
        status:true,
    },
    reducers:{

    },
    extraReducers: {
        [fetchUserRepos.pending]: (state, action) => {
            state.status = true;
        },
        [fetchUserRepos.fulfilled]: (state, action) => {
            state.userRepos = action.payload;
            state.status = false;
        },
        [fetchUserRepos.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default userReposReducer.reducer;