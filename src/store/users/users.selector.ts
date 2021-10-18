import {createSelector} from "reselect";

export const selectSelf = (state: any) => state

export const selectUsers = createSelector(
    selectSelf,
    (state) => state.users,
)
// export const selectUsersRepos = createSelector(
//     selectSelf,
//     (state) => state.usersRepos.usersRepos,
// )



// const selectItemById = (id:any) => createSelector(
//     [selectUsers, id],
//     // @ts-ignore
//
//     (items, itemId) => items[itemId]
// )