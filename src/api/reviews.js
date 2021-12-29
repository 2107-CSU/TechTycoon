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

export async function createReview(comments, productId, userId, wouldRecommend, token){
  try {
    const response = await fetch(BaseUrl + 'api/productreviews/' + productId, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        comments,
        userId,
        wouldRecommend
      })
    })

    const newReview = await response.json();
    return newReview;
  } catch (error) {
    throw error;
  }
}