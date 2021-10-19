import React from 'react';
import {Spin} from "antd";
import './UserInfo.scss';

const UserInfo = (props:any,) => {
    console.log(props);

    const user = props.user;
    const isLoading = props.isLoading;

    console.log(user.bio);
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
                    <p className="user-bio">{user.bio}</p>
                </div>
            )}
        </div>
    );
};

export default UserInfo;