import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../components/Home'
import LoginForm from '../components/LoginForm'

class AsyncApp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Router>
                <div>
                    <Header/>
                    <Route exact path='/' render={ () => <Home/> } />
                    <Route path='/login/' render={ () => <LoginForm/> } />
                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default AsyncApp