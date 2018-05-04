import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Header from '../components/Header';
import PaymentForm from '../merchant/PaymentForm';
import Cart from '../cart/Cart';
import { InventoryIndex, PlotView } from '../inventory/Inventory'


// class App extends Component {
//
//     render() {
//         console.log(this.props); //for test purposes
//
//         let component = this.props.component;
//
//         if (component == 'home') {
//             return (
//                 <div>
//                     <Header/>
//                     <h1> This is the main index</h1>
//                     <p><a href="/accounts/login/">Login</a></p>
//                     <p><a href="/accounts/register/">Register</a></p>
//                 </div>
//             );
//         }
//
//         if (component == 'payment-form') {
//             return (
//                 <PaymentForm amount={this.props.amount} />
//             );
//         }
//
//         if (component == 'cart') {
//             return (
//                 <Cart items={this.props.items} total={this.props.total} />
//             )
//         }
//
//         if(component == 'inventory-index' || component == "celestial_body_view"){
//             return (
//                 <InventoryIndex body_list={this.props.body_list} plot_list={this.props.plot_list} />
//             )
//         } else {
//             return (
//                 <p>Not the right route</p>
//             );
//         }
//
//         // return (
//         //   <div className="App">
//         //     <header className="App-header">
//         //       <img src={logo} className="App-logo" alt="logo" />
//         //       <h1 className="App-title">Welcome to SuPac</h1>
//         //     </header>
//         //     <p className="App-intro">
//         //       To get started, edit <code>src/App.js</code> and save to reload.
//         //     </p>
//         //   </div>
//         // );
//     }
// }


class Home extends Component {
    render() {
        return (
            <div>
                <h1> This is the main</h1>
                <p><a href="/accounts/login/">Login</a></p>
                <p><a href="/accounts/register/">Register</a></p>
            </div>
        )
    }
}


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/cart/" render={() => <Cart items={this.props.items} total={this.props.total} /> } />
                    <Route exact path="/inventory/" render={() => <InventoryIndex body_list={this.props.body_list} plot_list={this.props.plot_list} /> } />
                    <Route exact path="/inventory/celestial_body/:name" render={() => <InventoryIndex body_list={this.props.body_list} plot_list={this.props.plot_list} /> } />
                    <Route exact path="/inventory/celestial_body/plots/:name" render={() => <PlotView {...this.props} /> } />
                    <Route path="/merchant/" component={() => <PaymentForm amount={this.props.amount} /> } />
                </div>
            </Router>
        )
    }
}


export default App;
