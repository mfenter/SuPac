import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../components/Home'
import Cart from '../cart/Cart'
import {InventoryIndex, PlotView} from '../inventory/Inventory'
import PaymentForm from '../merchant/PaymentForm'
import Dashboard from '../components/Dashboard'
import LoginForm from '../components/LoginForm'

class AsyncApp extends Component {

    render() {
        return(
            <Router>
                <div>
                    <Header/>
                    <Route exact path='/' render={ () => <Home /> } />
                    <Route path='/cart/' render={ () => <Cart /> } />
                    <Route exact path='/inventory/' render={ () => <InventoryIndex body='sol' /> } />
                    <Route exact path='/inventory/:bodyname/' render={ ({ match }) => <InventoryIndex body={ match.params.bodyname }/> } />
                    <Route exact path='/inventory/celestial_body/plots/:name' render={ () => <PlotView /> } />
                    <Route path='/merchant/' render={ () => <PaymentForm /> } />
                    <Route path='/dashboard/' render={ () => <Dashboard /> } />
                    <Route path='/login/' render={ () => <LoginForm/> } />
                    <Footer/>
                </div>
            </Router>
        )
    }
}

AsyncApp.propTypes = {
    isLoggedIn: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { isLoggedIn } = state
    return {
        isLoggedIn
    }
}

export default connect(mapStateToProps)(AsyncApp)