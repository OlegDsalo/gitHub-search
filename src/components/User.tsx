import React, {useEffect, useState} from 'react';
import {Spin} from 'antd';
import {fetchUser} from "../store/user/user.slice";
import {fetchUserRepos} from "../store/userRepo/userRepos.slice";
import './User.css'
import {UserRepos} from "../types/Users.types";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {selectUserRepos} from "../store/userRepo/userRepo.selector";
import {selectUser} from "../store/user/user.selector";

const User = () => {
    const userReq = useSelector(selectUser);
    console.log(userReq);
    // const a = useSelector(selectItemById(id));

    const {userRepos, isLoaded} = useSelector(selectUserRepos);
    const dispatch = useDispatch();
    const {userName}: any = useParams();

    const [inputValue, setInputValue] = useState('');

    const handlerInputValue = (event: any) => {
        setInputValue(event.target.value);
    }

    useEffect(() => {
        dispatch(fetchUser(userName));
    }, [userName])

    useEffect(() => {
        dispatch(fetchUserRepos({userName, inputValue}))
    }, [userName, inputValue])
    //todo  розбити на компоненти  і передати userReq і витягнути обєкт і isLoading

    return (
        <div className='user'>
            <h1 className="title">GitHub Search</h1>
            {userReq.isLoading ? (<Spin className="loader" size="large" spinning={userReq.isLoading}/>) : (
                <div className="user-block">
                    <img className="user-avatar" src={userReq.avatar_url} alt=""/>
                    <div className='user-info'>
                        <p>{userReq.user.login}</p>
                        <p>{userReq.email}</p>
                        <p>{userReq.location}</p>
                        <p>{userReq.created_at}</p>
                        <p>{userReq.followers}</p>
                        <p>{userReq.following}</p>
                    </div>
                </div>
            )}
            <div className='search-repo'>
                <input className="search-repos" onChange={handlerInputValue} type="text"/>
                {isLoaded ? (<Spin className="loader" size="large" spinning={isLoaded}/>) : (
                    userRepos.map((item: UserRepos) => (
                        <div className='user-repos' key={item.name}>
                            <p><a href={item.html_url}>{item.name}</a></p>
                            <div>
                                <p>{item.forks}</p>
                                <p>{item.stargazers_count}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default User;
