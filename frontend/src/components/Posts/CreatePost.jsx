import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { createPostAPI } from '../../services/posts/postsAPI'
const CreatePost = () => {
  const postMutation = useMutation({mutationKey:['create-post'],
    mutationFn: createPostAPI
  });
    const formik = useFormik({
        initialValues:{
            title:'',
            description:'',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('description is required'),
        }),
        onSubmit:(values)=>{
console.log(values);
postMutation.mutate(values);

        }
    });
    console.log('mutation',postMutation)
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
        <input type='text' name='title' placeholder='enter title'
      {...formik.getFieldProps('title')}
      />
     {/* error message*/}
     {formik.touched.title && formik.errors.title && <span style={{color:"red"}}>title required</span>}
      <input type='text' name='description' placeholder='enter description'
      {...formik.getFieldProps('description')}
      />
      {formik.touched.description && formik.errors.description && <span style={{color:"red"}}>description required</span>}

      <button type='submit'>
        Create post
      </button>
        </form>
    </div>
  )
}

export default CreatePost
