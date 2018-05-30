import axios from 'axios'

export const INVALIDATE_LOGIN = 'INVALIDATE_LOGIN'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'

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

export function fetchLogin(username, password) {
    return dispatch => {
        dispatch(requestLogin())
        return axios.post('/api/login/', {
            username,
            password
        })
            .then(response => response.data)
            .then(json => dispatch(receiveLogin(json)))
    }
}