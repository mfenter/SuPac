import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Navbar, Nav, NavItem, Grid, Glyphicon } from 'react-bootstrap';
// TODO: ADD LINK FROM REACT ROUTER TO NAVITEMS

import {loggedIn, siteLogout} from '../app/auth';
import logo from '../logo.svg';

import { connect } from 'react-redux'
import { doLogout } from '../actions'

class Header extends Component {
    constructor() {
        super();

        this.state = {
            "quantity": 0
        }
    }

    // componentWillMount() {
    //     this.setState({
    //         "quantity": this.props.quantity
    //     })
    // }

    componentWillUpdate(nextProps) {
        // console.log(nextProps.quantity);
        if (nextProps.quantity !== this.state.quantity) {
            this.setState({
                "quantity": nextProps.quantity
            })
        }
        // console.log(this.state.quantity)
    }

    _siteLogout = (e) => {
        e.preventDefault()
        this.props.dispatch(doLogout())
        this.props.history.push('/login/')
    }

    render() {
        return (
            <div>
                <Navbar fluid inverse>
                    <Grid fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <img src={logo} alt="logo"/>
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav bsStyle="pills">
                                <NavItem eventKey={1} href="/">
                                    Home
                                </NavItem>
                                <NavItem eventKey={2} href="/inventory/">
                                    Inventory
                                </NavItem>
                            </Nav>
                            <Nav bsStyle="pills" pullRight>
                            {(this.props.loggedIn
                                    ?   ([<NavItem eventKey={1} href="/cart/">
                                            {this.state.quantity} <Glyphicon glyph="shopping-cart"/>
                                        </NavItem>,
                                        <NavItem>
                                            <a onClick={this._siteLogout}>logout</a>
                                        </NavItem>]
                                        )

                                    :   (<NavItem eventKey={1} href="/login/">
                                            Login
                                        </NavItem>)
                            )}
                            </Nav>
                        </Navbar.Collapse>
                    </Grid>
                </Navbar>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {loggedIn} = state.isLoggedIn.isLoggedIn;
    return {loggedIn}
}

Header = connect(mapStateToProps)(Header)

export default withRouter(Header)