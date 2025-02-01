import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchPost, updatePost } from '../../services/posts/postsAPI';
import { useQuery } from '@tanstack/react-query';
import { Mutation, useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const UpdatePost = () => {
    //get the post id
    const {postId} = useParams();
     //usequery
     const { data} = useQuery({
        queryKey: ["update-post"],
        queryFn:()=> fetchPost(postId),
    });
    const postMutation = useMutation({
        mutationKey: ['update-post'],
        mutationFn: updatePost,
        onSuccess: (data) => {
          console.log('Post edited successfully:', data);
        },
        onError: (error) => {
          console.error('Error creating post:', error.response?.data || error.message);
        },
      });
    
      // Formik hook for form management
      const formik = useFormik({
        initialValues: {
          title: data?.postFound.title || " ",
          description: data?.postFound.description || " ", },
          enableReinitializ:true,
        validationSchema: Yup.object({
          title: Yup.string().required('Title is required'),
          description: Yup.string().required('Description is required'),
        }),
        onSubmit: async (values) => {
    
      const postData = {
        title: values.title,
        description: values.description,
        postId
        };
    
      console.log("Sending postData:", postData); 
      postMutation.mutate(postData);
    },
      });
     //loading state
     const isLoading = postMutation.isPending;
     //iserror state
     const isError = postMutation.isError;
     //success state
     const isSuccess = postMutation.isSuccess;
    //error
    const error = postMutation.error;
      return (
    <div>
      <h1>you are editing{data?.postFound.title}</h1>
      <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Post created successfully</p>}
      {isError && <p>{error.message}</p>}
      <form onSubmit={formik.handleSubmit}>
        {/* Title Input */}
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title"
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <span style={{ color: 'red' }}>{formik.errors.title}</span>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            {...formik.getFieldProps('description')}
          />
          {formik.touched.description && formik.errors.description && (
            <span style={{ color: 'red' }}>{formik.errors.description}</span>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" disabled={postMutation.isLoading}>
            {postMutation.isLoading ? 'editing...' : 'Edit Post'}
          </button>
        </div>
      </form>

      {/* Global Mutation Error Display */}
      {postMutation.isError && (
        <p style={{ color: 'red' }}>Error: {postMutation.error.response?.data?.message || 'Something went wrong'}</p>
      )}

      {/* Success Message */}
      {postMutation.isSuccess && (
        <p style={{ color: 'green' }}>Post edited successfully!</p>
      )}
    </div>    </div>
  )
}

export default UpdatePost
