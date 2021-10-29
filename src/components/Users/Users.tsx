import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Col, Input, Row, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import User from '../User/User';
import { fetchUsers, setCurrentPage } from '../../store/users/users.slice';
import { fetchUsersRepos } from '../../store/usersRepos/usersRepos.slice';
import {
  selectUsers, selectUsersCurrentPage,
  selectUsersData, selectUsersIsLoading, selectUsersTotalCount,
} from '../../store/users/users.selector';
import { UsersValue } from '../../types/Users.types';
import { selectUsersRepoIsLoading, selectUsersRepositories } from '../../store/usersRepos/usersRepos.selector';
import Pagination from '../pagination/Pagination';
import './Users.scss';

const Users = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  // todo pagination
  const PER_PAGE = 3;
  const currentPage = useSelector(selectUsersCurrentPage);
  const totalCount = useSelector(selectUsersTotalCount);
  const pagesCount = Math.ceil(totalCount / PER_PAGE);
  console.log(pagesCount);
  // const testpages = [];
  // // todo manupulation with numbers
  // for (let i = 1; i <= pagesCount; i++) {
  //   testpages.push(i);
  // }
  // console.log('test', testpages);
  //  12
  const obj = useSelector(selectUsers);
  console.log('component obj', obj);
  // const pages = [1, 2, 3, 4, 5];

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
  }, [userName, currentPage]);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(fetchUsersRepos(data));
  //   }
  // }, [data]);
  return (
    <div className="users">
      <div className="left-sidebar">
        <Typography>
          <Typography.Title>
            Github search Users
          </Typography.Title>
        </Typography>
        <input className="search-users-name" placeholder="Search for Users" onChange={handleUserNameChange} />
        {usersIsLoading
          ? (<Spin className="loader" size="large" spinning={usersIsLoading} />)
          : (
            <Row justify="space-between" className="block" align="top">
              <Col>
                {
                data.map((user: UsersValue) => (
                  <Link to={`${match.url}${user.login}`} key={user.id}>
                    <div className="users-block">
                      <img className="img" src={user.avatar_url} alt="#" />
                      <Typography.Paragraph className="users-name">
                        {user.login}
                      </Typography.Paragraph>
                    </div>
                  </Link>
                ))
              }
              </Col>
              <Col>
                {
                repositories.map((repo: {id:number, length:number}) => (
                  <div className="repos-number" key={repo.id}>
                    {repo.length > 99 ? (
                      <p className="repo-number">Repos: 100+ </p>
                    ) : (
                      <p className="repo-number">
                        Repos:
                        &nbsp;
                        {repo.length}
                      </p>
                    )}
                  </div>
                ))
              }
              </Col>
            </Row>
          )}
        <div>
          <Pagination currentPage={currentPage} lastPage={pagesCount} pagesCount={pagesCount} />
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

// <Col>
//   {
//     repositories.map((repo: {id:number, length:number}) => (
//       <div className="repos-number" key={repo.id}>
//         {repo.length > 99 ? (
//           <p className="repo-number">Repos: 100+ </p>
//         ) : (
//           <p className="repo-number">
//             Repos:
//             &nbsp;
//             {repo.length}
//           </p>
//         )}
//       </div>
//     ))
//   }
// </Col>
