import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { Spin } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {axiosGetUser} from "../AsyncThunk/userReducer";
import {axiosGetUserRepo} from "../AsyncThunk/userRepoReducer";
import {axiosGetUsersCorectRepo} from "../AsyncThunk/userCurentRepo";
import './User.css'


import {UserRepo} from "../../types/Users.interface";

const User = () => {
    let {login}:any = useParams();

    const dispatch = useDispatch();
    const [inputValue,setInputValue] = useState();

    useEffect(()=> {
        dispatch(axiosGetUser(login));
        dispatch(axiosGetUserRepo(login));
    },[login])

    // useEffect(()=>{
    //     dispatch(axiosGetUsersCorectRepo(login,inputValue))
    // },[inputValue])

    const userObj  = useSelector((state:any) => state.user);
    const {user ,isLoading} = userObj;
    const {userRepo} = useSelector((state:any) =>state.userRepo)

    const corectRepo  = useSelector((state:any) => state.usersCorrectRepo);
    console.log(corectRepo);
    const handlerRepos = (event:any) => {
      setInputValue(event.target.value);
        console.log(event.target.value);
    }

    return (
        <div className='user'>
            <h1 className="center-title">GitHub Search</h1>
            {isLoading ? (<Spin className="loader" size="large" spinning={isLoading}/>):(
                <>
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
                </>
            )}
            <div className='search-repo'>
                     <input className="search-repos" onChange={handlerRepos} type="text"/>
                     {userRepo.map((item:UserRepo) => (
                     <div className='user-repos' key={item.name}>
                         <p><a href={`${item.html_url}`}>{item.name}</a></p>
                         <div>
                              <p>{item.forks}</p>
                             <p>{item.stargazers_count}</p>
                         </div>
                     </div>
                  ))}
            </div>
        </div>
    );
};

export default User;
