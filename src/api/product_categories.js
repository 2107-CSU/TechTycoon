const {BaseUrl} = require('./constants');

export async function getProductsByCategory(categoryId) {
    try {
        const response = await fetch(`${BaseUrl}api/productcategories/${categoryId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = response.json();

        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}