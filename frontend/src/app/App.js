import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';

import PaymentForm from '../merchant/PaymentForm'

class App extends Component {

    render() {
        console.log(this.props); //for test purposes
        let component = this.props.component;
        if (component == 'home') {
            return (
                <div>
                    <h1> This is the main index</h1>
                    <p><a href="/accounts/login/">Login</a></p>
                    <p><a href="/accounts/register/">Register</a></p>
                </div>
            );
        }

        if (component == 'payment-form') {
            return (
                <PaymentForm amount={this.props.amount}/>
            );
        } else {
            return (
                <p>Not the right route</p>
            );
        }

        // return (
        //   <div className="App">
        //     <header className="App-header">
        //       <img src={logo} className="App-logo" alt="logo" />
        //       <h1 className="App-title">Welcome to SuPac</h1>
        //     </header>
        //     <p className="App-intro">
        //       To get started, edit <code>src/App.js</code> and save to reload.
        //     </p>
        //   </div>
        // );
    }
}

export default App;
