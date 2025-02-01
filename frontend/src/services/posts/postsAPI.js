import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/posts";

export const createPostAPI = async (postData) => {
  console.log(postData);
  const response = await axios.post(`${BASE_URL}/create`, {
    title: postData.title,
    description: postData.description,
  });
  return response.data;
};
//finding all posts fetch
export const fetchAllPosts = async ()=> {
  const posts = await axios.get(BASE_URL);
  return posts.data;
}
//fecth one post by id
export const fetchPost = async (postId)=> {
  const post = await axios.get(`${BASE_URL}/${postId}`);
  return post.data;
}
//update post 
export const updatePost = async (postData) => {
  console.log(postData);
  const response = await axios.put(`${BASE_URL}/${postData?.postId}`, {
    title: postData.title,
    description: postData.description,
  });
  return response.data;
};
//delete post
export const deletePost = async (postId) => {
  const response = await axios.delete(`${BASE_URL}/${postId}`);
  return response.data;
};