import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useRouteMatch} from "react-router-dom";

export const UsersFetchData = () => {
    const dispatch = useDispatch();
    let match = useRouteMatch();
    const [userName, setUserName] = useState<any>('');
    const {users, status} = useSelector((state: any) => state.users);
    const {usersRepos} = useSelector((state: any) => state.usersRepos);


    return {userName, users, usersRepos, status, setUserName, dispatch, match}
}

export const UserFetchData = () => {
    const dispatch = useDispatch();
    let {userName}: any = useParams();

    const [inputValue, setInputValue] = useState('');
    const {user, isLoading} = useSelector((state: any) => state.user);
    const {userRepos, status}: any = useSelector((state: any) => state.userRepos);

    return {inputValue, setInputValue, user, isLoading, userRepos, dispatch, userName, status}
}