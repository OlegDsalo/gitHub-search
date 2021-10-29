import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRepos } from '../../store/userRepo/userRepos.slice';
import { UserReposValue } from '../../types/User.types';
import './UserRepos.scss';
import { selectUserRepositories, selectUserRepositoriesIsLoading } from '../../store/userRepo/userRepo.selector';

interface UserInfoProps {
  userName:string;
  inputValue:string;
}

const UserRepos = ({ userName, inputValue }: UserInfoProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserRepositoriesIsLoading);
  const repositories = useSelector(selectUserRepositories);

  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    dispatch(fetchUserRepos({ userName, inputValue, currentPage }));
  }, [userName, inputValue, currentPage]);
  // console.log('curentPage', currentPage);
  // console.log('repositories', repositories);
  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler);
  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler);
  //   };
  // }, []);
  // const scrollHandler = (e) => {
  // eslint-disable-next-line max-len
  // if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
  //   console.log('scroll');
  // }
  // console.log('scrollHeight', e.target.documentElement.scrollHeight);
  // console.log('scrollTop', e.target.documentElement.scrollTop);
  // console.log('innerHeight', window.innerHeight);
  // };
  return (
    <div className="user-repos">
      {isLoading
        ? (<Spin className="loader" size="large" spinning={isLoading} />)
        : (
          repositories.map((item) => (
            <div className="repos-item" key={item.name}>
              <p><a href={item.html_url}>{item.name}</a></p>
              <div>
                <p>{item.forks}<img
                  src="https://img.icons8.com/material-outlined/24/000000/star--v2.png"
                  alt="star"
                />
                </p>
                <p>{item.stargazers_count}<img
                  src="https://img.icons8.com/material-sharp/24/000000/code-fork.png"
                  alt="fork"
                />
                </p>
              </div>
            </div>
          ))
        )}
    </div>
  );
};

export default UserRepos;
