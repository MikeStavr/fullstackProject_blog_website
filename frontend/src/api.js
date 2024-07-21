import axios from "axios";

const URL = "http://localhost:3000";

// Return the data of all the posts
export async function getPosts() {
  const response = await axios.get(`${URL}/posts/`);
  if (response.status === 200) return response.data;
}

// Return the data of a single post
export async function getPost(id) {
  const response = await axios.get(`${URL}/posts/${id}`);
  if (response.status === 200) return response.data;
}

// Create a new post
export async function createPost(post) {
  const response = await axios.post(`${URL}/posts/`, post);
  return response;
}

// Update a post
export async function updatePost(id, post) {
  const response = await axios.put(`${URL}/posts/${id}`, post);
  return response;
}

// Delete a post
export async function deletePost(id) {
  const response = await axios.delete(`${URL}/posts/${id}`);
  return response;
}

export async function getUsers() {
  const response = await axios.get(`${URL}/users/`);
  if (response.status === 200) return response.data;
}

export async function getUser(id) {
  const response = await axios.get(`${URL}/users/${id}`);
  if (response.status === 200) return response.data;
}

export async function createUser(user) {
  const response = await axios.post(`${URL}/users/`, user);
  return response;
}

export async function updateUser(id, user) {
  const response = await axios.put(`${URL}/users/${id}`, user);
  return response;
}

export async function verifyUser(user) {
  const response = await axios.post(`${URL}/users/login`, user);
  if (response.data.success) {
    console.log(response);
    return response.data.token;
  } else {
    return response.data.success;
  }
}
