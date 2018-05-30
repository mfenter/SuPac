import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function loggedIn(){
    return !!localStorage.getItem('loginToken');
}


function getCSRFToken(path) {
    axios.all([axios.get(path)])
        .then( response => {
            console.log(response[0]);
        });
}


function getToken(username, pass, component, dest){
    let data = {username: username, password: pass};
    axios.all([axios.post("/api/login/", data)])
        .then( response => {

            component.props.history.push(dest)
        })
        .catch( (error) => {console.log(error)})
}


function siteLogin(username, pass, component, dest){
    if (username === undefined || pass === undefined){
        return loggedIn();
    }
    getToken(username, pass, component, dest);
    return loggedIn();
}

function siteLogout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginToken');
    axios.all([axios.get("/api/logout/")])
        .then( response => {

        });


}

export default siteLogin
export { loggedIn, siteLogout, getCSRFToken }
