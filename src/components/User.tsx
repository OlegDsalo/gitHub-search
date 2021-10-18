import React, {useEffect} from 'react';
import {Spin} from 'antd';
import {fetchUser} from "../slice/user";
import {fetchUserRepos} from "../slice/userRepos";
import './User.css'
import {UserRepos} from "../types/Users.types";
import {UserFetchData} from "../selector/selector";

const User = () => {
    const {inputValue, setInputValue, user, isLoading, userRepos, dispatch, userName, status} = UserFetchData();
    console.log(userRepos);
    const handlerInputValue = (event: any) => {
        setInputValue(event.target.value);
    }

    useEffect(() => {
        dispatch(fetchUser(userName));
    }, [userName])

    useEffect(() => {
        dispatch(fetchUserRepos({userName, inputValue}))
    }, [userName, inputValue])

    return (
        <div className='user'>
            <h1 className="center-title">GitHub Search</h1>
            {isLoading ? (<Spin className="loader" size="large" spinning={isLoading}/>) : (
                <div className="user-block">
                    <img className="user-avatar" src={user.avatar_url} alt=""/>
                    <div className='user-info'>
                        <p>{user.login}</p>
                        <p>{user.email}</p>
                        <p>{user.location}</p>
                        <p>{user.created_at}</p>
                        <p>{user.followers}</p>
                        <p>{user.following}</p>
                    </div>
                </div>
            )}
            <div className='search-repo'>
                <input className="search-repos" onChange={handlerInputValue} type="text"/>
                {status ? (<Spin className="loader" size="large" spinning={status}/>) : (
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
