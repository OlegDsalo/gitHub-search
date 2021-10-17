import React, {useEffect, useState} from 'react';
import {Link, Route, Switch, useRouteMatch,} from "react-router-dom";
import User from './User';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from '../slice/users'
import {fetchUsersRepos} from "../slice/usersRepos";
import {Col, Input, Row, Spin, Typography} from "antd";
import {UsersTypes} from "../types/Users.types";
import './Users.css';


const Users = () => {
    let match = useRouteMatch();

    const [userName, setUserName] = useState<any>('');


    const handlerSearchValue = (event:any)=>{
        setUserName(event.target.value);
    }

    const dispatch = useDispatch();

    const {users , status}  = useSelector((state:any) => state.users);

    useEffect(() => {
        dispatch(fetchUsers(userName));
    },[userName]);

    useEffect(() => {
        if(users){
            dispatch(fetchUsersRepos(users));
        }
    },[users]);


    const {usersRepos} = useSelector((state:any)=> state.usersRepos);

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
                            (<Spin className="loader" size="large" spinning={status} />):
                            (
                            users?.map((item:UsersTypes) => (
                                <Link to={`${match.url}${item.login}`} key={item.id} >
                                    <div className='users-block' >
                                        <img className='img' src={item.avatar_url} alt="#"/>
                                        <Typography.Paragraph className="users-name">{item.login}</Typography.Paragraph>
                                    </div>
                                </Link>
                            ))
                        )
                        }
                    </Col>
                    <Col>
                            {usersRepos.map((repo:any)=>(
                            <div className='repos-number' key={repo.id}>
                                {repo.length === 100?(
                                    <p className='repo-number'>100+</p>
                                ):(

                                    <p className='repo-number'>{repo.length}</p>
                                )}
                            </div>
                            ))}
                    </Col>
                </Row>
            </div>
            <div >
                <Switch>
                    <Route path={`/:userName`}>
                        <User />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Users;
