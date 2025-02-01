import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deletePost, fetchAllPosts } from '../../services/posts/postsAPI';
import { Link } from 'react-router-dom';
const PostsList = () => {
    //usequery
    const { isError,isLoading,isSuccess,data,error,refetch} = useQuery({
        queryKey: ["list-posts"],
        queryFn: fetchAllPosts,
    });
    const postMutation = useMutation({
        mutationKey: ['delete-post'],
        mutationFn: deletePost,
      });
      //delete

      const deletehandle = async (postId)=>{
        postMutation.mutateAsync(postId).then(()=>{
        refetch();
        }).catch((error)=>console.log(error));
        
      }
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Success</p>}
      {error && <p>{error.message}</p>}

      {data?.posts.map((post)=>{
        return(
            <div key={post._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <Link to={`/posts/${post?._id}`}>
            <button>Edit post</button>
            </Link>
            <button onClick={()=>deletehandle(post?._id)}>Delete post</button>
          </div>
        )
      })}
    </div>
  )
}

export default PostsList
