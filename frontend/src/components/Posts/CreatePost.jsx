import { Mutation, useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { createPostAPI } from '../../services/posts/postsAPI';

const CreatePost = () => {
  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPostAPI,
    onSuccess: (data) => {
      console.log('Post created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating post:', error.response?.data || error.message);
    },
  });

  // Formik hook for form management
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '', },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {

  const postData = {
    title: values.title,
    description: values.description,
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
            {postMutation.isLoading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>

      {/* Global Mutation Error Display */}
      {postMutation.isError && (
        <p style={{ color: 'red' }}>Error: {postMutation.error.response?.data?.message || 'Something went wrong'}</p>
      )}

      {/* Success Message */}
      {postMutation.isSuccess && (
        <p style={{ color: 'green' }}>Post created successfully!</p>
      )}
    </div>
  );
};

export default CreatePost;
