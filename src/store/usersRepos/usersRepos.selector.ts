import { createSelector } from 'reselect';
// import { selectSelf } from '../users/users.selector';

// export const selectUsersRepos = createSelector(
//   selectSelf,
//   (state) => state.usersRepos,
// );
const selectUsersRepos = (state) => state.usersRepos;

export const selectUsersRepositories = createSelector(
  selectUsersRepos,
  (state) => state.repositories,
);
export const selectUsersRepoIsLoading = createSelector(
  selectUsersRepos,
  (state) => state.isLoading,
);
