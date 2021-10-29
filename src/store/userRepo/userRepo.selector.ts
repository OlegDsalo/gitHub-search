import { createSelector } from 'reselect';

export const selectUserRepos = (state) => state.userRepos;

export const selectUserRepositories = createSelector(
  selectUserRepos,
  (state) => state.repositories,
);

export const selectUserRepositoriesIsLoading = createSelector(
  selectUserRepos,
  (state) => state.isLoading,
);
