import React, {Component} from "react";
import {withRouter, Redirect} from "react-router-dom";
import { connect } from 'react-redux'

import { logout } from '../actions'

class Dashboard extends Component {
    constructor() {
        super()
    }

    _handleLogout = (e) => {
        e.preventDefault()
        this.props.dispatch(logout())
    }

    render(){
        console.log(this.props)
        return (
            <div>
                {!this.props.loggedIn && <Redirect to='/login/'/>}
                <h3>Hello Dashboard</h3>
                <button onClick={this._handleLogout}>Log out</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {loggedIn} = state.isLoggedIn.isLoggedIn;
    return {loggedIn}
}

Dashboard = connect(mapStateToProps)(Dashboard)

export default withRouter(Dashboard)