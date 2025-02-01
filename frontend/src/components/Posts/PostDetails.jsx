import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchPost } from '../../services/posts/postsAPI';
import { useQuery } from '@tanstack/react-query';
const PostDetails = () => {
    //get the post id
    const {postId} = useParams();
     //usequery
     const { isError,isLoading,isSuccess,data,error} = useQuery({
        queryKey: ["post-details"],
        queryFn:()=> fetchPost(postId),
    });
    console.log(data);
    
  return (
    <div>
      <h1>{data?.postFound.title}</h1>
      <h2>{data?.postFound.description}</h2>
    </div>
  )
}

export default PostDetails
