import {createSelector} from "reselect";

export const selectSelf = (state: any) => state;

export const selectUsers = createSelector(
    selectSelf,
    (state) => state.users,
)
