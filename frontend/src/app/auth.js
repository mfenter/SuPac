class Auth {
    login(username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    }

    logout() {
        delete localStorage.token
    }

    loggedIn() {
        return !!localStorage.token
    }

    getToken(username, pass, cb) {

    }
}

export default Auth