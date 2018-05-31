import {combineReducers} from 'redux'

import {
    LOGOUT,
    INVALIDATE_LOGIN,
    RECEIVE_LOGIN,
    REQUEST_LOGIN
} from "./actions";


function isLoggedInHelper(
    state = {
        isFetching: false,
        didInvalidate: false,
        loggedIn: false
    },
    action
) {
    switch (action.type) {
        case LOGOUT:
            return Object.assign({}, state, {
                loggedIn: false,
                username: undefined,
                fullName: undefined
            })
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

function isLoggedIn(state = {}, action) {
    switch (action.type) {
        case LOGOUT:
        case INVALIDATE_LOGIN:
        case RECEIVE_LOGIN:
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isLoggedIn: isLoggedInHelper(state[isLoggedIn], action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    isLoggedIn
})

export default rootReducer