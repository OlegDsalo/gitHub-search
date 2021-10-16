import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Users from "../components/Users";


export  const SearchUser = () => {
    return (
        <div>
            <Switch>
                <Route path="/">
                    <Users/>
                </Route>
            </Switch>
        </div>
    );
};
