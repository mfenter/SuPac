import axios from 'axios'

export const INVALIDATE_LOGIN = 'INVALIDATE_LOGIN'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const LOGOUT = 'LOGOUT'

export function logout() {
    return {
        type: LOGOUT
    }
}

export function invalidateLogin() {
    return {
        type: INVALIDATE_LOGIN
    }
}

function requestLogin() {
    return {
        type: REQUEST_LOGIN
    }
}

function receiveLogin(json) {
    return {
        type: RECEIVE_LOGIN,
        username: json.username,
        fullName: json.fullname
    }
}

export function fetchLogin(username, password, dest, hist) {
    return dispatch => {
        dispatch(requestLogin());
        return axios.all([axios.post("/api/login/", {username, password})])
            .then(response => response[0].data)
            .then(json => dispatch(receiveLogin(json)))
    }
}