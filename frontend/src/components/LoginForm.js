import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';


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
                        <form>
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="User Name"
                                placeholder="Enter User Name"
                            />
                            <FieldGroup
                                id="formControlPassword"
                                type="password"
                                label="Password"
                            />
                        </form>

                    </Row>
                    <Row>
                        <Col xsOffset={4} xs={12}>
                        <Button type="submit" bsStyle="primary">Submit</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xsOffset={4} xs={12}>
                        <Link to='/register/'>Register</Link>
                        </Col>
                    </Row>
                </Col>
            </Grid>
            // Standard Page Header
            // Page Title Section
            // Username field component
            // Password component
            // Submit button
            // Register Link
            // Standard Footer
        )
    }
}

export default LoginForm