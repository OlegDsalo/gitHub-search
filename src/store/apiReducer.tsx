//
//
// const defaultState = {
//     userName:[],
//     userNameRepos:[],
//     user:[],
//     userRepos:[],
//     isLoading:true
// }
//
// export const SET_USERNAME = "SET_USERNAME";
// export const SET_USER = "SET_USER";
// export const SET_USER_REPOS = "SET_USER_REPOS";
// export const SET_USERNAME_REPOS = "SET_USER_REPOS";
//
// export const apiReducer = (state = defaultState, action:any) =>{
//     switch (action.type){
//         case SET_USERNAME:
//             return{
//                 ...state,
//                 userName: action.payload,
//                 isLoading:false
//             }
//         case SET_USER:
//             return {
//                 ...state,
//                 user: action.payload,
//                 isLoading:false
//             }
//         case SET_USERNAME_REPOS:
//             return {
//                 ...state,
//                 userNameRepos: action.payload,
//                 isLoading:false
//             }
//         case SET_USER_REPOS:
//             return {
//                 ...state,
//                 userRepos: action.payload,
//                 isLoading:false
//             }
//         default:
//             return state
//     }
// }

export {}