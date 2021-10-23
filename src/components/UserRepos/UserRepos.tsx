import React from 'react';
import { Spin } from 'antd';
import { UserReposType } from '../../types/User.types';
import './UserRepos.scss';

interface UserInfoProps {
    repositories: UserReposType[];
    isLoading: boolean;
}

const UserRepos = ({ repositories, isLoading }: UserInfoProps) => (
  <div className="user-repos">
    {isLoading ? (<Spin className="loader" size="large" spinning={isLoading} />) : (
      repositories.map((item) => (
        <div className="repos-item" key={item.name}>
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

export default UserRepos;
