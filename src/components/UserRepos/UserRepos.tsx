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
import { REPOSITORIES_PER_PAGE } from '../../service/github';

interface UserInfoProps {
  userName:string;
  repoName:string;
}

interface UserRepos {
  full_name: string,
  name: string,
  forks: number,
  stargazers_count: number,
  html_url: string
}

const UserRepos = ({ userName, repoName }: UserInfoProps) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectUserRepositoriesIsLoading);
  const repositories = useSelector(selectUserRepositories);
  const totalCount = useSelector(selectUserReposTotalCount);
  const repoPage = useSelector(selectUserReposRepoPage);
  const pagesCount = Math.ceil(totalCount / REPOSITORIES_PER_PAGE);

  useEffect(() => {
    dispatch(fetchUserRepos({
      userName,
      repoName,
      repoPage,
    }));
  }, [userName, repoName, repoPage, dispatch]);

  const handleScroll = (event: any) => {
    console.log(isLoading);
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const isLastPage = repoPage < pagesCount;
    const needLoadMore = clientHeight + scrollHeight * 0.2 > Math.floor(scrollHeight - scrollTop);
    if (!isLoading) {
      if (needLoadMore && isLastPage) {
        dispatch(setRepoPage(repoPage + 1));
      }
    }
  };

  return (
    <div className="user-repos" onScroll={handleScroll}>
      {repositories.map((repo:UserRepos) => (
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
