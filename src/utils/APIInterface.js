const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(18).substr(-8);
const vars = {
  headers: { 'Authorization': token,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'},
  method: 'GET'
}
export const idGenerator = () => {
  return Math.random().toString(36).substring(2, 20) + Math.random().toString(36).substring(2, 15);
}

export const getCategories = () =>
  fetch(`${api}/categories`, vars )
    .then(res => res.json())
    .then(data => data.categories)

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`,  vars )
    .then(res => res.json())
    .then(data => data)

export const getPosts = () =>
  fetch(`${api}/posts`,  vars )
    .then(res => res.json())
    .then(data => data)

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`,  vars )
  .then(res => res.json())
  .then(data => data)

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`,  vars )
  .then(res => res.json())
  .then(data => data)

//Posts Methods
export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    ...vars,
    method: 'POST',
    body: JSON.stringify({ comment})
  }).then(res => res.json())
