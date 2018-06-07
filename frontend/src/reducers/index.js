import {combineReducers} from 'redux'
import isLoggedIn from './isLoggedIn'
import currentBody from './currentBody'
import bodyChildren from './bodyChildren'
import plotItems from './plotItems'

const rootReducer = combineReducers({
    isLoggedIn,
    currentBody,
    bodyChildren,
    plotItems
})

export default rootReducer