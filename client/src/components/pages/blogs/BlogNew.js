import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../helpers/auth'

// import ImageUpload from '../../ImageUpload'
// import NewEditor from '../../newEditor/NewEditor'

import BlogForm from './BlogForm'

// Chakra imports
import { Container, Box, Button, Select, Input } from '@chakra-ui/react'

const BlogNew = () => {
  // ! State
  const [ formFields, setFormFields ] = useState({
    title: '',
    category: '',
    tags: '',
    description: '',
    thumbnail: '',
    article: '',
  })

  const [ errors, setErrors ] = useState(null)

  const navigate = useNavigate()

  // ! Execution
  // submit blog to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/blogs', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('SUCCESS', data._id)
      navigate(`/blogs/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  return (
    <main className="blog-form-page">
      <BlogForm
        handleSubmit={handleSubmit} 
        formFields={formFields}
        setFormFields={setFormFields}
        errors={errors}
        setErrors={setErrors}
        formName="Add Blog" 
      />
    </main>
  )
}

export default BlogNew