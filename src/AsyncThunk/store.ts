import {configureStore} from "@reduxjs/toolkit";
import usersReducer from './usersReducer';
import userReducer from './userReducer';
import userRepoReducer from "./userRepoReducer";
import usersRepoReducer from "./usersRepoReducer";
import userRepoCorectReducer from "./userCurentRepo";

export const store = configureStore({
    reducer:{
        users:usersReducer,
        user:userReducer,
        userRepo:userRepoReducer,
        usersRepo:usersRepoReducer,
        userCorectRepo:userRepoCorectReducer,
    },
});

export default store;