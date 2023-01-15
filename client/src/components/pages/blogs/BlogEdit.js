import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../helpers/auth'

import BlogForm from './BlogForm'

const BlogEdit = () => {

  // ! Location Variables
  const { blogsId } = useParams()
  const navigate = useNavigate()

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

  // ! Execution
  // get blog for data
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${blogsId}`)
        // console.log(data)
        setFormFields(data)
      } catch (err) {
        console.log(err.response.data)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [blogsId])

  // Send updates to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/blogs/${blogsId}`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log('SUCCESS', data._id)
      navigate(`/blogs/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }
  // useEffect(() => {
  //   console.log(formFields)
  // }, [formFields])

  return (
    <main className="blog-form-page">
      <BlogForm
        handleSubmit={handleSubmit} 
        formFields={formFields}
        setFormFields={setFormFields}
        errors={errors}
        setErrors={setErrors}
        formName="Edit Blog" 
      />
    </main>
  )
}

export default BlogEdit