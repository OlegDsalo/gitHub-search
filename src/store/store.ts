import {configureStore} from "@reduxjs/toolkit";
import usersReducer from '../slice/users';
import userReducer from '../slice/user';
import  usersRepos from "../slice/usersRepos";
import userReposReducer from "../slice/userRepos";

export const store = configureStore({
    reducer:{
        users:usersReducer,
        usersRepos:usersRepos,
        user:userReducer,
        userRepos:userReposReducer,
    },
});

export default store;