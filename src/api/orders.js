const BaseUrl = "http://localhost:5000/";

export async function createOrder(token) {
    try {
        const response = await fetch(`${BaseUrl}api/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const result = await response.json();

        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}