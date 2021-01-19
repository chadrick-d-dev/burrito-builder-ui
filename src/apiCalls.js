export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const postOrder = (name, ingredients) => {
  let postData = {
    "id": Date.now(),
    "name": name,
    "ingredients": ingredients
  };

  let postString = JSON.stringify(postData)

  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: postString,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
}

