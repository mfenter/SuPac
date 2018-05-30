import axios from 'axios'

export const INVALIDATE_LOGIN = 'INVALIDATE_LOGIN'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'

export function invalidateLogin(username) {
    return {
        type: INVALIDATE_LOGIN,
        username
    }
}

function requestLogin(username, password) {
    return {
        type: REQUEST_LOGIN,
        username,
        password
    }
}

function receiveLogin(json) {
    return {
        type: RECEIVE_LOGIN,
        username: json.data.username,
        fullName: json.data.fullname
    }
}

export function fetchLogin(username, password) {
    return dispatch => {
        dispatch(requestLogin(username, password))
        return axios.post('/api/login', {
            username,
            password
        })
            .then(response => response.json())
            .then(json => dispatch(receiveLogin(json)))
    }
}