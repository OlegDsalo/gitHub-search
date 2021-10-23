import { configureStore } from '@reduxjs/toolkit';
import users from './users/users.slice';
import user from './user/user.slice';
import usersRepos from './usersRepos/usersRepos.slice';
import userRepos from './userRepo/userRepos.slice';

export const store = configureStore({
  reducer: {
    users,
    usersRepos,
    user,
    userRepos,
  },
});

export default store;
