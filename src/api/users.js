const {BaseUrl} = require('./constants');

export async function login(username, password) {
    try {
        const response = await fetch(`${BaseUrl}api/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body : JSON.stringify({
                username,
                password
            })
        });
        const result = await response.json();

        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function register(username, password, email) {
    try {
        const response = await fetch(`${BaseUrl}api/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body : JSON.stringify({
                username,
                password,
                email
            })
        });
        const result = await response.json();

        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getUser(token) {
    try {
        const response = await fetch(`${BaseUrl}api/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function checkUser(username) {
    try {
        const response = await fetch(`${BaseUrl}api/users/check/${username}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}


// ADMIN FUNCTIONS ------------------------------------------

export async function makeAdmin(token, userId) {
    try {
        const response = await fetch(`${BaseUrl}api/users/admin/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        console.log(result);
        return result;
    } catch(error) {
        throw error;
    }
}

export async function deleteUser(token, userId) {
    try {
        const response = await fetch(`${BaseUrl}api/users/admin/delete/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        console.log(result);
        return result;
    } catch(error) {
        throw error;
    }
}

export async function getAllUsers(token) {
    try {
        const response = await fetch(`${BaseUrl}api/users/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        console.log(result);
        return result;
    } catch(error) {
        throw error;
    }
}
