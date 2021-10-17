import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiRequestInstance from "../Service/apiRequests";


export const axiosGetUsersCorectRepo:any = createAsyncThunk(
    'userRepoCorect/axiosGetUserRepoCorect',
    async (login:string,thunkAPI) => {
        // console.log(login);

        const res:any = await apiRequestInstance.getUserCorectRepos(login);
        return res.items;
    });


export  const userRepoCorectReducer = createSlice({
    name:'getUserCorectRepo',
    initialState:{
        usersCorrectRepo:[],
        status:true,
    },
    reducers:{

    },
    extraReducers: {
        [axiosGetUsersCorectRepo.pending]: (state, action) => {
            state.status = true;
        },
        [axiosGetUsersCorectRepo.fulfilled]: (state, action) => {
            state.usersCorrectRepo = action.payload;
            state.status = false;
        },
        [axiosGetUsersCorectRepo.rejected]: (state, action) => {
            state.status = true;
        },
    },
});

export default userRepoCorectReducer.reducer;