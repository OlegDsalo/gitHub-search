import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserRepos, setRepoPage,
} from '../../store/userRepo/userRepos.slice';
import './UserRepos.scss';
import {
  selectUserRepositories,
  selectUserRepositoriesIsLoading, selectUserReposRepoPage,
  selectUserReposTotalCount,
} from '../../store/userRepo/userRepo.selector';

interface UserInfoProps {
  userName:string;
  inputValue:string;
}

const UserRepos = ({ userName, inputValue }: UserInfoProps) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectUserRepositoriesIsLoading);
  const repositories = useSelector(selectUserRepositories);
  const totalCount = useSelector(selectUserReposTotalCount);
  const repoPage = useSelector(selectUserReposRepoPage);

  const PER_PAGE = 10;
  const pagesCount = Math.ceil(totalCount / PER_PAGE);

  useEffect(() => {
    dispatch(fetchUserRepos({
      userName,
      inputValue,
      repoPage,
    }));
  }, [userName, inputValue, repoPage, dispatch]);

  const handleScroll = (event: any) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    if (isLoading === false) {
      if (Math.ceil(scrollHeight - scrollTop) === clientHeight && repoPage < pagesCount) {
        dispatch(setRepoPage(repoPage + 1));
      }
    }
  };

  return (
    <div className="user-repos" onScroll={handleScroll}>
      {repositories.map((repo) => (
        <div className="repos-item" key={repo.full_name}>
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
      <Spin className="loader" size="large" spinning={isLoading} />
    </div>
  );
};

export default UserRepos;
