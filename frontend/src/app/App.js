import React, {Component} from 'react';
import './App.css';

import Header from '../components/Header';
import PaymentForm from '../merchant/PaymentForm';
import Cart from '../cart/Cart';
import InventoryIndex from '../inventory/Inventory'

class App extends Component {

    render() {
        console.log(this.props); //for test purposes

        let component = this.props.component;

        if (component == 'home') {
            return (
                <div>
                    <Header/>
                    <h1> This is the main index</h1>
                    <p><a href="/accounts/login/">Login</a></p>
                    <p><a href="/accounts/register/">Register</a></p>
                </div>
            );
        }

        if (component == 'payment-form') {
            return (
                <PaymentForm amount={this.props.amount} />
            );
        }

        if (component == 'cart') {
            return (
                <Cart items={this.props.items} total={this.props.total} />
            )
        }

        if(component == 'inventory-index' || component == "celestial_body_view"){
            return (
                <InventoryIndex body_list={this.props.body_list} plot_list={this.props.plot_list} />
            )
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
