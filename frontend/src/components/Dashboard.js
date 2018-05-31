import React, {Component} from "react";
import {withRouter, Redirect} from "react-router-dom";
import { connect } from 'react-redux'

class Dashboard extends Component {
    constructor() {
        super()
    }

    render(){
        return (
            <div>
                {!this.props.loggedIn && <Redirect to='/login/'/>}
                <h3>Hello Dashboard</h3>
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