import axios from 'axios';

function loggedIn(){
    return !!localStorage.getItem('loginToken');
}

function getToken(username, pass, component, dest){
    let data = {username: username, password: pass};
    axios.all([axios.post("/api/obtain-auth-token/", data)])
        .then( response => {
            localStorage.setItem('loginToken', response[0].data.token);
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
}

export default siteLogin
export { loggedIn, siteLogout }

