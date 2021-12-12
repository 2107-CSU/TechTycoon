const BaseUrl = "http://localhost:5000/";

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