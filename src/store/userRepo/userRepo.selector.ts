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

export const selectUserReposTotalCount = createSelector(
  selectUserRepos,
  (state) => state.totalCount,
);

export const selectUserReposRepoPage = createSelector(
  selectUserRepos,
  (state) => state.repoPage,
);
