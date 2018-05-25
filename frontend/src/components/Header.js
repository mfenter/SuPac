import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Navbar, Nav, NavItem, Grid, Glyphicon } from 'react-bootstrap';
// TODO: ADD LINK FROM REACT ROUTER TO NAVITEMS

import siteLogout from '../app/auth';
import logo from '../logo.svg';

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

    siteLogout(what){
        console.log("this.logout called")
        siteLogout();
        what.props.history.push('/login/');
        console.log("login pushed on history")
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
                            <Nav pullRight>
                            {(this.props.user != false
                                    ?   (<NavItem eventKey={1} href="/cart/">
                                            {this.state.quantity} <Glyphicon glyph="shopping-cart"/>
                                        </NavItem>,
                                        <NavItem>
                                            <a onClick={() => this.siteLogout(this)}>logout</a>
                                        </NavItem>
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

export default withRouter(Header)