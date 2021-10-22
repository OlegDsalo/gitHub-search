import { createSelector } from 'reselect';
import { selectSelf } from '../users/users.selector';

export const selectUsersRepos = createSelector(
  selectSelf,
  (state) => state.usersRepos,
);
