import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, HelpBlock, Row} from 'react-bootstrap';
import DjangoCSRFToken from 'django-react-csrftoken';
import {Link, withRouter} from 'react-router-dom';
import siteLogin from '../app/auth'


function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class LocalForm extends Component {
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
        return (<div className="text-center">
                <u><h3>Login</h3></u>
                <Form>
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
                        placeholder="Enter Password"
                        onChange={this.onChange}
                    />
                    <Button type="submit" onClick={this.onLoginSubmit} bsStyle="primary">Submit</Button> <br/>
                    <Link to='/register/'>Register</Link>
                </Form>
            </div>

        )
    }
}

LocalForm = withRouter(LocalForm)

class CenterView extends Component {
    render() {
        return (

            <Grid>
                <Row className="show-grid">
                    <Col xs={1} md={4}></Col>
                    <Col xs={4} md={4}>{this.props.children}</Col>
                    <Col xs={1} md={4}></Col>
                </Row>
            </Grid>

        )
    }
}

class LoginForm extends Component {
    render(){
        return(
        <CenterView>
            <LocalForm />
        </CenterView>
        )
    }
}


export default withRouter(LoginForm)