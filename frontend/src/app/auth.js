import axios from 'axios';


function loggedIn(){
    return !!localStorage.loginToken
}

function getToken(username, pass){
    axios.post("/api/obtain-auth-token/",
        { username: username,
            password: pass
        }
    ).then( (response) => {
        localStorage.setItem('loginToken', response.data.token)
    }).catch( (error) => {
        console.log(error)
    })


}

function siteLogin(username, pass){
    if (username === undefined || pass === undefined){
        return loggedIn()
    }
    getToken(username, pass);
    return loggedIn();
}

function siteLogout(){
    console.log("auth.logout called");
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginToken');


}

export default siteLogin
export { loggedIn, siteLogout }