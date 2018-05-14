import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
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
            <div>
                <u><h3>Login</h3></u>
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
                    <Button
                        type="submit"
                    >Submit</Button>

                </form>
                <Link to='/register/'>Register</Link>
            </div>
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