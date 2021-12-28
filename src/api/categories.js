const {BaseUrl} = require('./constants');

export async function getCategories()
{
    try{
        const response = await fetch(BaseUrl + 'api/categories', {
            headers: {
                'Content-Type': 'application/json'
              }
        })
        const categories = await response.json();
        return categories;

    } catch(error){
        throw error;
    }
}