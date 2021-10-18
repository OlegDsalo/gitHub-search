import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Users from "./components/Users";

function App() {
    return (
        <Switch>
            <Route path="/">
                <Users/>
            </Route>
        </Switch>
    );
}

export default App;
