import React, { useCallback, useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Col, Row, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import User from '../User/User';
import { fetchUsers } from '../../store/users/users.slice';
import { fetchUsersRepos } from '../../store/usersRepos/usersRepos.slice';
import {
  selectUsersCurrentPage,
  selectUsersData, selectUsersIsLoading, selectUsersTotalCount,
} from '../../store/users/users.selector';
import { UsersValue } from '../../types/Users.types';
import { selectUsersRepositories } from '../../store/usersRepos/usersRepos.selector';
import Pagination from '../pagination/Pagination';
import { clearRepositories } from '../../store/userRepo/userRepos.slice';
import { USERS_PER_PAGE } from '../../service/github';
import './Users.scss';

const Users = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const currentPage = useSelector(selectUsersCurrentPage);
  let totalCount = useSelector(selectUsersTotalCount);
  totalCount = totalCount > 1000 ? 1000 : totalCount;

  const pagesCount = Math.ceil(totalCount / USERS_PER_PAGE);

  const data = useSelector(selectUsersData);
  const usersIsLoading = useSelector(selectUsersIsLoading);

  const repositories = useSelector(selectUsersRepositories);

  const [userName, setUserName] = useState<string>('');
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUserNameChange = useCallback(
    debounce(handleUserNameChange, 500), [userName],
  );

  useEffect(() => {
    dispatch(fetchUsers({ userName, currentPage }));
  }, [userName, currentPage, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(fetchUsersRepos(data));
    }
  }, [data, dispatch]);
  return (
    <Row justify="space-around">
      <Col className="left-sidebar" xs={23} sm={23} md={23} lg={11} xl={11} xxl={11}>
        <Typography.Title>
          Github search Users
        </Typography.Title>
        <input className="search-users-name" placeholder="Search for Users" onChange={debouncedUserNameChange} />
        {usersIsLoading
          ? (<Spin className="loader" size="large" spinning={usersIsLoading} />)
          : (
            <Row justify="space-between" align="top">
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
        <Pagination currentPage={currentPage} pagesCount={pagesCount} />
      </Col>
      <Col className="right-side" xs={24} sm={24} md={23} lg={11} xl={11} xxl={11}>
        <Switch>
          <Route path="/:userName">
            <User />
          </Route>
        </Switch>
      </Col>
    </Row>
  );
};

export default Users;
