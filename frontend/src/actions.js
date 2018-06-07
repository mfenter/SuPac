import axios from 'axios'


/*
* IS LOGGED IN ACTIONS
* */

export const INVALIDATE_LOGIN = 'INVALIDATE_LOGIN'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const LOGOUT = 'LOGOUT'


/*
* CELESTIAL BODY ACTIONS
* */

export const REQUEST_BODY_DATA = 'REQUEST_BODY_DATA'
export const RECEIVE_BODY_DATA = 'RECEIVE_BODY_DATA'
export const BODY_CHILDREN = 'BODY_CHILDREN'
export const PLOT_ITEMS = 'PLOT_ITEMS'


/*
* IS LOGGED IN ACTION CREATORS & HELPERS
* */

function logout() {
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

export function doLogout() {
    return dispatch => {
        return axios.get('/api/logout/')
            .then(dispatch(logout()))
    }
}


/*
* CELESTIAL BODY ACTION CREATORS & HELPERS
* */

/*
function requestBodyData() {
    return {
        type: REQUEST_BODY_DATA
    }
}
*/

function receiveBodyData(name, json) {
    return {
        type: RECEIVE_BODY_DATA,
        name,
        description: json.description,
        image: json.image,
        parent: json.parent
    }
}

/*function plotItems(plots) {
    return {
        type: PLOT_ITEMS,
        plots
    }
}*/

function bodyChildren(children) {
    return {
        type: BODY_CHILDREN,
        children
    }
}

export function fetchBodyData(name) {

    return dispatch => {
        return axios.all([axios.get(`/api/get-body-data/${name}/`)])
            .then(response => {
                console.log(response[0].data);
                return response[0].data
            })
            .then(json => {
                dispatch(bodyChildren(json.children));
                dispatch(receiveBodyData(name, json))
            })
            .catch(response => {console.log(response)})
    }
}

