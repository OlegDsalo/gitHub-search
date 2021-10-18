import {configureStore} from "@reduxjs/toolkit";
import usersReducer from './users/users.slice';
import userReducer from './user/user.slice';
import usersRepos from "./usersRepos/usersRepos.slice";
import userReposReducer from "./userRepo/userRepos.slice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        usersRepos: usersRepos,
        user: userReducer,
        userRepos: userReposReducer,
    },
});

export default store;