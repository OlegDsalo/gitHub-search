import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../store/user/user.slice';
import { fetchUserRepos } from '../../store/userRepo/userRepos.slice';
import { selectUserRepos } from '../../store/userRepo/userRepo.selector';
import { selectUser } from '../../store/user/user.selector';
import UserInfo from '../UserInfo/UserInfo';
import UserRepos from '../UserRepos/UserRepos';
import './User.scss';

interface ParamTypes {
    userName: string
}

const User = () => {
  const userReq = useSelector(selectUser);

  const userReposReq = useSelector(selectUserRepos);
  const dispatch = useDispatch();
  const { userName } = useParams<ParamTypes>();
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchUser(userName));
  }, [userName]);

  useEffect(() => {
    dispatch(fetchUserRepos({ userName, inputValue }));
  }, [userName, inputValue]);

  return (
    <div className="user">
      <h1 className="title">GitHub Search</h1>
      <UserInfo
        user={userReq.user}
        isLoading={userReq.isLoading}
      />
      <div className="search-repo">
        <input className="search-repos" onChange={handleInputChange} type="text" />
        <UserRepos
          userRepos={userReposReq.userRepos}
          isLoading={userReposReq.isLoading}
        />
      </div>
    </div>
  );
};

export default User;
