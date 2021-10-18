import {createSelector} from "reselect";
import {selectSelf} from "../users/users.selector";

export const selectUser = createSelector(
    selectSelf,
    (state) => state.user,
)