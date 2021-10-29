import React from 'react';
import { Spin } from 'antd';
import './UserProfile.scss';
import { UserProfileValue } from '../../types/User.types';

interface UserProfileProps {
    data: UserProfileValue;
    isLoading: boolean;
}

const UserProfile = ({ data, isLoading }: UserProfileProps) => (
  <div className="user-profile">
    {isLoading ? (<Spin className="loader" size="large" spinning={isLoading} />) : (
      <div className="user-description">
        <img className="user-avatar" src={data.avatar_url} alt="" />
        <ul className="user-info">
          <li>Username:{data.login}</li>
          <li>Email: {data.email}</li>
          <li>Location: {data.location}</li>
          <li>Join date:{new Date(data.created_at).toLocaleDateString()}</li>
          <li>{data.followers} Followers</li>
          <li>Following {data.following}</li>
          <li className="user-bio">{data.bio}</li>
        </ul>
      </div>
    )}
  </div>
);

export default UserProfile;
