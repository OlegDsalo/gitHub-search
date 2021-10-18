import React, {useEffect} from 'react';
import {Link, Route, Switch,} from "react-router-dom";
import User from './User';
import {fetchUsers} from "../slice/users"
import {fetchUsersRepos} from "../slice/usersRepos";
import {Col, Input, Row, Spin, Typography} from "antd";
import {UsersTypes} from "../types/Users.types";
import './Users.css';
import {UsersFetchData} from "../selector/selector";


const Users = () => {
    const {userName, users, usersRepos, status, setUserName, dispatch, match} = UsersFetchData();

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
                <Input placeholder='Search for Users' onChange={handlerSearchValue}/>
                <Row justify='space-between' className="block" align='top'>
                    <Col>
                        {status ?
                            (<Spin className="loader" size="large" spinning={status}/>) :
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
                        {usersRepos.map((total: any) => (
                            <div className='repos-number' key={total.id}>
                                {total.length > 99 ? (
                                    <p className='repo-number'>100+ {total.total_count}</p>
                                ) : (

                                    <p className='repo-number'>{total.length}</p>
                                )}
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
            <div>
                <Switch>
                    <Route path="/:userName">
                        <User/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Users;
