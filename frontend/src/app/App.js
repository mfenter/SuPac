import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PaymentForm from '../merchant/PaymentForm';
import Cart from '../cart/Cart';
import {InventoryIndex, PlotView} from '../inventory/Inventory'

import createCartSocket from './websocket';
import LoginForm from "../components/LoginForm";
import LandingHero from "../components/HeroJumboTron";
import Auth from "./auth";

class Home extends Component {
    render() {
        return (
            <div>
                <h1> This is the main</h1>
                <p><a href="/accounts/login/">Login</a></p>
                <p><a href="/accounts/register/">Register</a></p>
                <LandingHero user={this.props.user}/>
            </div>
        )
    }
}

function requireAuth(nextState, replace) {
    if (!Auth.loggedIn()) {
        replace({
            pathname:'/app/login/',
            state: {nextPathname: '/app/'}
        })
    }
}


class App extends Component {
    constructor() {
        super();
        this.state = {
            "quantity": 0
        };
    }

    componentWillMount() {
        // CHECK FOR USER AND CREATE A CART SOCKET IF USER EXISTS
        console.log("App mounted");
    }

    componentDidMount() {
        if (this.props.user != false) {
            this.cs = createCartSocket(this.props.user);
        }

        let selfie = this;

        //TODO: Maybe try to do this.cs.onconnect = func here instead of timeout
        setTimeout(function () {
            selfie.cs.send(JSON.stringify({
                'action': "get"
            }));

            selfie.cs.onmessage = function (ev) {
                let data = JSON.parse(ev.data);
                let qty = data['qty'];
                selfie.setState({
                    "quantity": qty
                });
            };
        }, 500);
    }

    updateCart = (action, plotName) => {
        //SEND ACTION AND PLOT TO SOCKET AND ...
        this.cs.send(JSON.stringify({
            'action': action,
            'plot': plotName
        }));

        let selfie = this;

        //RECEIVED FROM THE SERVER SOCKET
        this.cs.onmessage = function (ev) {
            let data = JSON.parse(ev.data);
            let qty = data['qty'];
            selfie.setState({
                "quantity": qty
            });
            console.log(qty)
        };
    };

    render() {
        return (
            <Router>
                <div>
                    <Header quantity={this.state.quantity} user={this.props.user}/>
                    <Route exact path="/" onEnter={requireAuth} render={() => <Home user={this.props.user}/>}/>
                    <Route path="/cart/" render={() => <Cart items={this.props.items} total={this.props.total}/>}/>
                    <Route exact path="/inventory/" render={() => <InventoryIndex body_list={this.props.body_list}
                                                                                  plot_list={this.props.plot_list}/>}/>
                    <Route exact path="/inventory/celestial_body/:name"
                           render={() => <InventoryIndex body_list={this.props.body_list}
                                                         plot_list={this.props.plot_list}/>}/>
                    <Route exact path="/inventory/celestial_body/plots/:name"
                           render={() => <PlotView {...this.props} updateCart={this.updateCart}
                                                   qty={this.state.quantity}/>}/>
                    <Route path="/merchant/" render={() => <PaymentForm amount={this.props.amount}/>}/>
                    <Route path="/login/" render={() => <LoginForm/>}/>
                    <Footer />
                </div>
            </Router>
        )
    }
}


export default App;
