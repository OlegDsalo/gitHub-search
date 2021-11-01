import React, { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRepos } from '../../store/userRepo/userRepos.slice';
import { UserReposValue } from '../../types/User.types';
import './UserRepos.scss';
import { selectUserRepositories, selectUserRepositoriesIsLoading } from '../../store/userRepo/userRepo.selector';
import Repositories from './Repositories';

interface UserInfoProps {
  userName:string;
  inputValue:string;
}

const UserRepos = ({ userName, inputValue }: UserInfoProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserRepositoriesIsLoading);
  const repositories = useSelector(selectUserRepositories);
  const [repoPage, setRepoPage] = useState<number>(1);
  // const [repos, setRepos] = useState([]);
  // todo state or action for clear array repositories
  console.log('repositories', repositories);
  useEffect(() => {
    dispatch(fetchUserRepos({
      userName,
      inputValue,
      repoPage,
    }));
  }, [userName, inputValue, repoPage, dispatch]);

  const scrollHandler = useCallback((e) => {
    console.log('isLoading', isLoading);
    if (!isLoading) {
      if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
        setRepoPage(repoPage + 1);
        console.log('scroll', repoPage);
      }
    }
  }, [isLoading, repoPage]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);
  return (
    <div className="user-repos">
      {repositories.map((repo, index) => (
        <div className="repos-item" key={repo.name}>
          <p><a href={repo.html_url}>{repo.name}</a></p>
          <div>
            <p>{repo.forks}<img
              src="https://img.icons8.com/material-outlined/24/000000/star--v2.png"
              alt="star"
            />
            </p>
            <p>{repo.stargazers_count}<img
              src="https://img.icons8.com/material-sharp/24/000000/code-fork.png"
              alt="fork"
            />
            </p>
          </div>
        </div>
      ))}
      {/* <Spin className="loader" size="large" spinning={isLoading} /> */}
    </div>
  );
};

export default UserRepos;
