import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';

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
                        <form action={'/accounts/login/'} method={'post'}>
                            <DjangoCSRFToken/>
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
                            <Button type="submit" bsStyle="primary">Submit</Button>
                        </form>

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

export default LoginForm