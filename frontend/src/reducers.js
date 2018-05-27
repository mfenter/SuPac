import { combineReducers } from 'redux'

function isLoggedIn(state = 'false', action) {
    switch (action.type) {
        default:
            return state
    }
}

const rootReducer = combineReducers({
    isLoggedIn
})

export default rootReducer