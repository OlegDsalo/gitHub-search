import { createSelector } from 'reselect';

const selectUsersRepos = (state) => state.usersRepos;

export const selectUsersRepositories = createSelector(
  selectUsersRepos,
  (state) => state.repositories,
);
export const selectUsersRepoIsLoading = createSelector(
  selectUsersRepos,
  (state) => state.isLoading,
);
