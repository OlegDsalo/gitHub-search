import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../store/user/user.slice';
import { selectUser, selectUserData, selectUserIsLoading } from '../../store/user/user.selector';
import UserProfile from '../UserProfile/UserProfile';
import UserRepos from '../UserRepos/UserRepos';
import './User.scss';

interface ParamTypes {
    userName: string
}

const User = () => {
  const userReq = useSelector(selectUserData);
  const userIsLoadingReq = useSelector(selectUserIsLoading);
  const dispatch = useDispatch();
  const { userName } = useParams<ParamTypes>();
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchUser(userName));
  }, [userName]);

  // useEffect(() => {
  //   dispatch(fetchUserRepos({ userName, inputValue, currentPage }));
  // }, [userName, inputValue]);

  return (
    <div className="user">
      <h1 className="user-title">User Profile</h1>
      <UserProfile
        data={userReq}
        isLoading={userIsLoadingReq}
      />
      <div className="search-repo">
        <h1 className="repos-title">Search by repo name</h1>
        <input className="search-repos" onChange={handleInputChange} type="text" />
        <UserRepos
          userName={userName}
          inputValue={inputValue}
        />
      </div>
    </div>
  );
};

export default User;
