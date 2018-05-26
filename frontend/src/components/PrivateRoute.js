import React, {Component} from 'react'
import {Redirect, Route} from "react-router-dom";
import {loggedIn} from "../app/auth";


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        loggedIn() === true
            ? <Component {...props} />
            : <Redirect to='/login/'/>
    )}/>
);

export default PrivateRoute