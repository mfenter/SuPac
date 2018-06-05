import {combineReducers} from 'redux'
import isLoggedIn from './isLoggedIn'
import currentBody from './currentBody'
import bodyItems from './bodyItems'
import plotItems from './plotItems'

const rootReducer = combineReducers({
    isLoggedIn,
    currentBody,
    bodyItems,
    plotItems
})

export default rootReducer