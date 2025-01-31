import axios from "axios";
//promise
const BASE_URL = "http://localhost:5000/api/v1/posts/create"
export const createPostAPI = async (postData)=>{
  const response = await axios.post(BASE_URL,{postData});
  return response.data;
}