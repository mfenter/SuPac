import React, {Component} from "react";
import {withRouter, Redirect} from "react-router-dom";
import { connect } from 'react-redux'

class Dashboard extends Component {
    render(){
        return (
            <div>
                {!this.props.loggedIn && <Redirect to='/login/'/>}
                {this.props.isFetchingBody && <h2>Loading...</h2>}
                {!this.props.isFetchingBody && <h3>Hello Dashboard</h3>}
            </div>
        )
    }
}

function mapStateToProps(state){
    const {loggedIn} = state.isLoggedIn;
    const {isFetchingBody} = state.currentBody;
    return {loggedIn, isFetchingBody}
}

Dashboard = connect(mapStateToProps)(Dashboard)

export default withRouter(Dashboard)