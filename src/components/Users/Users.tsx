import React, {useEffect, useState} from 'react';
import {Link, Route, Switch, useRouteMatch,} from "react-router-dom";
import User from '../User/User';
import {fetchUsers} from "../../store/users/users.slice"
import {fetchUsersRepos} from "../../store/usersRepos/usersRepos.slice";
import {Col, Input, Row, Spin, Typography} from "antd";
import {UsersTypes} from "../../types/Users.types";
import {useDispatch, useSelector} from "react-redux";
import {selectUsers} from "../../store/users/users.selector";
import './Users.scss';

const Users = () => {
    const {users, isLoading} = useSelector(selectUsers);
    const {usersRepos} = useSelector((state: any) => state.usersRepos);

    const dispatch = useDispatch();
    const match = useRouteMatch();

    const [userName, setUserName] = useState<any>('');


    const handlerSearchValue = (event: any) => {
        setUserName(event.target.value);
    }

    useEffect(() => {
        dispatch(fetchUsers(userName));
    }, [userName]);

    useEffect(() => {
        if (users) {
            dispatch(fetchUsersRepos(users));
        }
    }, [users]);

    return (
        <div className='users'>
            <div className="left-sidebar">
                <Typography>
                    <Typography.Title>
                        Git hub searcher
                    </Typography.Title>
                </Typography>
                <Input className='search-users-name' placeholder='Search for Users' onChange={handlerSearchValue}/>
                <Row justify='space-between' className="block" align='top'>
                    <Col>
                        {isLoading ?
                            (<Spin className="loader" size="large" spinning={isLoading}/>) :
                            (
                                users?.map((item: UsersTypes) => (
                                    <Link to={`${match.url}${item.login}`} key={item.id}>
                                        <div className='users-block'>
                                            <img className='img' src={item.avatar_url} alt="#"/>
                                            <Typography.Paragraph
                                                className="users-name">{item.login}</Typography.Paragraph>
                                        </div>
                                    </Link>
                                ))
                            )
                        }
                    </Col>
                    <Col>
                        {usersRepos.map((repo: any) => (
                            <div className='repos-number' key={repo.id}>
                                {repo.length > 99 ? (
                                    <p className='repo-number'>100+ </p>
                                ) : (
                                    <p className='repo-number'>{repo.length}</p>
                                )}
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
            <Switch>
                <Route path="/:userName">
                    <User/>
                </Route>
            </Switch>
        </div>
    );
};

export default Users;
