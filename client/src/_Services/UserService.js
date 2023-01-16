const baseURL = "http://54.254.184.90:3001"

const signin = async (user) => {
    try {
        let response = await fetch(baseURL + '/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const sigupUser = async (user) => {
    try {
        let response = await fetch(baseURL + '/auth/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const signout = async () => {
    try {
        let response = await fetch(baseURL + '/auth/signout/', { method: 'GET' })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export {
    signin,
    signout,
    sigupUser
}