import { Mutation, useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { createPostAPI } from '../../services/posts/postsAPI';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
const CreatePost = () => {
  const [description,setdescription] = useState('');
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
      description: '', },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {

  const postData = {
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
         <ReactQuill 
         value={formik.values.description}
         onChange={(value)=>{
          setdescription(value);
          formik.setFieldValue("description",value);
         }}/>
          {formik.touched.description && formik.errors.description && (
            <span style={{ color: 'red' }}>{formik.errors.description}</span>
          )}

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
