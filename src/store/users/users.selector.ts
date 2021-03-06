import { createSelector } from 'reselect';

export const selectUsers = (state) => state.users;

export const selectUsersData = createSelector(
  selectUsers,
  (state) => state.data,
);

export const selectUsersIsLoading = createSelector(
  selectUsers,
  (state) => state.isLoading,
);

export const selectUsersCurrentPage = createSelector(
  selectUsers,
  (state) => state.currentPage,
);

export const selectUsersTotalCount = createSelector(
  selectUsers,
  (state) => state.totalCount,
);
