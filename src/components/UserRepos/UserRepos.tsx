import React, { useEffect, useState } from 'react';
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

  console.log('repositories', repositories);
  useEffect(() => {
    dispatch(fetchUserRepos({
      userName,
      inputValue,
      repoPage,
    }));
  }, [userName, inputValue, repoPage]);
  // todo pagination

  // console.log('curentPage', currentPage);
  // console.log('repositories', repositories);
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  const scrollHandler = (e) => {
    // if (isLoading) {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setRepoPage((prevState) => {
        console.log('prevState must +1', prevState);
        return (prevState + 1);
      });
      console.log('scroll', repoPage);
    }
    // }
    // console.log('scrollHeight', e.target.documentElement.scrollHeight);
    // console.log('scrollTop', e.target.documentElement.scrollTop);
    // console.log('innerHeight', window.innerHeight);
  };
  return (
    <div className="user-repos">
      {repositories.map((repo, index) => (
        <Repositories repo={repo} key={index} />
      ))}
      {/* <Spin className="loader" size="large" spinning={isLoading} /> */}
    </div>
  );
};

export default UserRepos;
