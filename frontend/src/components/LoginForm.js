import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Form, Grid, HelpBlock, Row} from 'react-bootstrap';
import DjangoCSRFToken from 'django-react-csrftoken';
import {Link, withRouter} from 'react-router-dom';
import siteLogin, {loggedIn} from '../app/auth'


function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    onLoginSubmit = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const pass = this.state.password;
        let result = siteLogin(username, pass, this, '/dashboard/');
        if (!result) {
            console.log(result)// style front end with failure
        } else {

            this.props.history.push('/dashboard/');
        }
    };

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    render() {
        return (
            <Grid>
                <Col xs={4} xsOffset={4}>
                    <Row>
                        <Col xsOffset={4} xs={12}>
                        <u><h3>Login</h3></u>
                        </Col>
                    </Row>
                    <Row>
                        <Form >
                            <DjangoCSRFToken/>
                            <FieldGroup
                                id="formControlsText"
                                name="username"
                                value={this.state.username}
                                type="text"
                                label="User Name"
                                placeholder="Enter User Name"
                                onChange={this.onChange}
                            />
                            <FieldGroup
                                id="formControlPassword"
                                value={this.state.password}
                                name="password"
                                type="password"
                                label="Password"
                                onChange={this.onChange}
                            />
                            <Row>
                            <Col xsOffset={4}>
                            <Button type="submit" onClick={this.onLoginSubmit} bsStyle="primary">Submit</Button>
                            </Col>
                            </Row>
                        </Form>

                    </Row>
                    <Row>
                        <Col xsOffset={4} xs={12}>
                        <Link to='/register/'>Register</Link>
                        </Col>
                    </Row>
                </Col>
            </Grid>
        )
    }
}

export default withRouter(LoginForm)