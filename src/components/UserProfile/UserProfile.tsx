import React from 'react';
import { Spin } from 'antd';
import './UserProfile.scss';
import { parse } from 'date-fns';
import { UserProfileTypes } from '../../types/User.types';

interface UserProfileProps {
    data: UserProfileTypes;
    isLoading: boolean;
}

const UserProfile = ({ data, isLoading }: UserProfileProps) => (
  <div className="user-profile">
    {isLoading ? (<Spin className="loader" size="large" spinning={isLoading} />) : (
      <div>
        <div className="user">
          <img className="user-avatar" src={data.avatar_url} alt="" />
          <ul className="user-info">
            <li>{data.login}</li>
            <li>{data.email}</li>
            <li>{data.location}</li>
            <li>{new Date(data.created_at).toLocaleDateString()}</li>
            <li>
              {data.followers}
              &nbsp;
              Followers
            </li>
            <li>
              Following
              &nbsp;
              {data.following}
            </li>
          </ul>
        </div>
        <p className="user-bio">{data.bio}</p>
      </div>
    )}
  </div>
);

export default UserProfile;
