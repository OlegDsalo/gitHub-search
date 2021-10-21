import React from 'react';
import {Spin} from "antd";
import './UserInfo.scss';
import {UserInfoTypes} from "../../types/User.types";

interface UserInfoProps {
    user: UserInfoTypes;
    isLoading: boolean;
}

const UserInfo = ({user, isLoading}: UserInfoProps) => {
    return (
        <div className='user-info'>
            {isLoading ? (<Spin className="loader" size="large" spinning={isLoading}/>) : (
                <div className="">
                    <div className='user'>
                        <img className="user-avatar" src={user.avatar_url} alt=""/>
                        <div>
                            <p>{user.login}</p>
                            <p>{user.email}</p>
                            <p>{user.location}</p>
                            <p>{user.created_at}</p>
                            <p>{user.followers}</p>
                            <p>{user.following}</p>
                        </div>
                    </div>
                    <div>
                        <p className="user-bio">{user.bio}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;