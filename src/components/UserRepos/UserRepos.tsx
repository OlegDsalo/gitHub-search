import React from 'react';
import {Spin} from "antd";
import { UserReposType} from "../../types/Users.types";
import './UserRepos.scss'

const UserRepos = (props:any) => {
    const userRepos = props.userRepos;
    const isLoading = props.isLoading;

    return (
        <div className='user-repos'>
            {isLoading ? (<Spin className="loader" size="large" spinning={isLoading}/>) : (
                userRepos.map((item: UserReposType) => (
                    <div className='repos-item' key={item.name}>
                        <p><a href={item.html_url}>{item.name}</a></p>
                        <div>
                            <p>{item.forks}</p>
                            <p>{item.stargazers_count}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default UserRepos;