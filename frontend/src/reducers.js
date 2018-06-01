import {combineReducers} from 'redux'

import {
    LOGOUT,
    INVALIDATE_LOGIN,
    RECEIVE_LOGIN,
    REQUEST_LOGIN
} from "./actions";


function isLoggedIn(
    state = {
        isFetching: false,
        didInvalidate: false,
        loggedIn: false
    },
    action
) {
    switch (action.type) {
        case LOGOUT:
            let clone = Object.assign({}, state, {
                loggedIn: false
            })
            let deleteKeys = ['username', 'fullName', 'lastUpdated']
            deleteKeys.forEach(e => delete clone[e])
            return clone
        case INVALIDATE_LOGIN:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                loggedIn: true,
                didInvalidate: false,
                username: action.username,
                fullName: action.fullName,
                lastUpdated: Date.now()
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    isLoggedIn
})

export default rootReducer