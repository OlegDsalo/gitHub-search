import {createSelector} from "reselect";
import {selectSelf} from "../users/users.selector";

export const selectUser = createSelector(
    selectSelf,
    (state) => state.user,
)


//
// const selectUsers = (state: any) => {
//     return state.users;
// }
//
// export const selectUserByUserName =(userName:any)=> createSelector([
//     selectUsers
//     ],
//     ( {users}: any) => {
//     console.log('users',users)
//         console.log('userName',userName)
//     return users.find((elem: any) => elem.login === userName)
// }
// );


