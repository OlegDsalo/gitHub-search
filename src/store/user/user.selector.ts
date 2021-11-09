import { createSelector } from 'reselect';

export const selectUser = (state) => state.user;

export const selectUserData = createSelector(
  selectUser,
  (user) => user.data,
);

export const selectUserIsLoading = createSelector(
  selectUser,
  (user) => user.isLoading,
);
