import React, {Component} from 'react'
import {Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        props.loggedIn === true
            ? <Component {...props}/>
            : <Redirect to='/login/' />
    )}/>
);

function mapStateToProps(state){
    const {loggedIn} = state.isLoggedIn.isLoggedIn;
    return {loggedIn}
}



export default connect(mapStateToProps)(PrivateRoute);