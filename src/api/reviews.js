const {BaseUrl} = require('./constants');


export async function getReviews(productId){
  try{
    const response = await fetch(BaseUrl + 'api/productreviews/' + productId, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const reviews = await response.json();
    console.log("the reviews are", reviews);
    return reviews;

  } catch(error)
  {
    console.log(error)
    throw error;
  } 
}