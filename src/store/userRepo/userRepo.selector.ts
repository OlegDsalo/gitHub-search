import { createSelector } from 'reselect';
import { selectSelf } from '../users/users.selector';

export const selectUserRepos = createSelector(
  selectSelf,
  (state) => state.userRepos,
);
