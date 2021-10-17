import React, {useEffect, useState} from 'react';
import {Link, Route, Switch, useRouteMatch,} from "react-router-dom";
import User from './User';
import {useDispatch, useSelector} from "react-redux";
import {axiosGetUsers} from '../AsyncThunk/usersReducer'
import {axiosGetUsersRepo} from "../AsyncThunk/usersRepoReducer";
import {Col, Input, Row, Spin, Typography} from "antd";
import {UsersInfo} from "../../types/Users.interface";
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
        dispatch(axiosGetUsers(userName));
    },[userName]);

    useEffect(() => {
        if(users){
            dispatch(axiosGetUsersRepo(users));
        }
    },[users]);


    const {usersRepo} = useSelector((state:any)=>state.usersRepo);


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
                        {status?
                            (<Spin className="loader" size="large" spinning={status} />):
                            (
                            users?.items?.map((item:UsersInfo) => (
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
                            {usersRepo.map((repo:any)=>(
                            <div className='repos-number' key={repo.name}>
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
                    <Route path={`/:login`}>
                        <User />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Users;
