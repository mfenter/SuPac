import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'



function getCSRFToken(path) {
    axios.all([axios.get(path)])
        .then( response => {
        });
}



export { getCSRFToken }
