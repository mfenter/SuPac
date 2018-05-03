import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';

import  logo  from '../logo.svg';

class Header extends Component {
    render(){
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
                                <NavItem eventKey={1} href="/" >
                                    Home
                                </NavItem>
                                <NavItem eventKey={2} href="/cart/" >
                                    Cart
                                </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Grid>
                </Navbar>
            </div>
        )
    }
}

export default Header