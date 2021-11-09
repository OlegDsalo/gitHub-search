import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { fetchUser } from '../../store/user/user.slice';
import { selectUserData, selectUserIsLoading } from '../../store/user/user.selector';
import UserProfile from '../UserProfile/UserProfile';
import UserRepos from '../UserRepos/UserRepos';
import './User.scss';
import { clearRepositories } from '../../store/userRepo/userRepos.slice';

interface ParamTypes {
    userName: string
}

const User = () => {
  const userReq = useSelector(selectUserData);
  const userIsLoadingReq = useSelector(selectUserIsLoading);
  const dispatch = useDispatch();
  const { userName } = useParams<ParamTypes>();
  const [repoName, setRepoName] = useState<string>('');

  const handleRepoNameChange = (event) => {
    setRepoName(event.target.value);
    dispatch(clearRepositories());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRepoNameChange = useCallback(
    debounce(handleRepoNameChange, 500),
    [repoName],
  );

  useEffect(() => {
    dispatch(fetchUser(userName));
  }, [dispatch, userName]);

  return (
    <div className="user">
      <h1 className="user-title">User Profile</h1>
      <UserProfile
        data={userReq}
        isLoading={userIsLoadingReq}
      />
      <div className="search-repo">
        <h1 className="repos-title">Search by repo name</h1>
        <input className="search-repos" onChange={debouncedRepoNameChange} type="text" />
        <UserRepos
          userName={userName}
          repoName={repoName}
        />
      </div>
    </div>
  );
};

export default User;
