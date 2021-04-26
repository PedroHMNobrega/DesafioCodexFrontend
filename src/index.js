import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import './assets/config.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login.jsx";
import Cadastro from "./Pages/Cadastro";
import PrivateRoute from "./Components/PrivateRoute";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact={true} path="/" component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/cadastrar' component={Cadastro} />
            {/*<Route component={NotFound} />*/}
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
