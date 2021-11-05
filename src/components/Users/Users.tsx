import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Col, Row, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import User from '../User/User';
import { fetchUsers } from '../../store/users/users.slice';
import { fetchUsersRepos } from '../../store/usersRepos/usersRepos.slice';
import {
  selectUsersCurrentPage,
  selectUsersData, selectUsersIsLoading, selectUsersTotalCount,
} from '../../store/users/users.selector';
import { UsersValue } from '../../types/Users.types';
import { selectUsersRepoIsLoading, selectUsersRepositories } from '../../store/usersRepos/usersRepos.selector';
import Pagination from '../pagination/Pagination';
import './Users.scss';
import { clearRepositories } from '../../store/userRepo/userRepos.slice';

const Users = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const PER_PAGE = 3;
  const currentPage = useSelector(selectUsersCurrentPage);
  const totalCount = useSelector(selectUsersTotalCount);
  const pagesCount = Math.ceil(totalCount / PER_PAGE);

  const data = useSelector(selectUsersData);
  const usersIsLoading = useSelector(selectUsersIsLoading);

  const repositories = useSelector(selectUsersRepositories);
  const isLoading = useSelector(selectUsersRepoIsLoading);

  const [userName, setUserName] = useState<string>('');
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchUsers({ userName, currentPage }));
  }, [userName, currentPage, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(fetchUsersRepos(data));
    }
  }, [data, dispatch]);
  return (
    <div className="users">
      <div className="left-sidebar">
        <Typography>
          <Typography.Title>
            Github search Users
          </Typography.Title>
        </Typography>
        <input className="search-users-name" placeholder="Search for Users" onChange={handleUserNameChange} />
        {isLoading
          ? (<Spin className="loader" size="large" spinning={isLoading} />)
          : (
            <Row justify="space-between" className="block" align="top">
              <Col>
                {
                data.map((user: UsersValue) => (
                  <Link to={`${match.url}${user.login}`} key={user.id}>
                    <div className="users-block">
                      <img className="img" src={user.avatar_url} alt="#" />
                      <Typography.Paragraph
                        className="users-name"
                        onClick={() => {
                          dispatch(clearRepositories());
                        }}
                      >
                        {user.login}
                      </Typography.Paragraph>
                    </div>
                  </Link>
                ))
              }
              </Col>
              <Col>
                {repositories.map((repo: {total_count:number}, index:number) => (
                  <div className="repos-number" key={index}>
                    <p className="repo-number">Repos: {repo.total_count} </p>
                  </div>
                ))}
              </Col>
            </Row>
          )}
        <div>
          <Pagination currentPage={currentPage} pagesCount={pagesCount} />
        </div>
      </div>
      <Switch>
        <Route path="/:userName">
          <User />
        </Route>
      </Switch>
    </div>
  );
};

export default Users;
