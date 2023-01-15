import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import ImageUpload from '../../ImageUpload'
import NewEditor from '../../newEditor/NewEditor'


// Chakra imports
import { Container, Box, Button, Select, Input } from '@chakra-ui/react'

const BlogForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors, formName }) => {

  // ! State
  // Variable to store raw blog data to use to dropdown filters
  const [blogs, setBlogs] = useState([])

  // Variables to store filtered categories and tags
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  // Get values and add to formfields object 
  const handleChange = (e) => {
    // console.log(`${e.target.name} - ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }

  // Get data from blogs to populate categories ang tags dropdowns
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/blogs')
        setBlogs(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    filterCategories()
    filterTags()
  }, [blogs])

  const filterCategories = () => {
    const filter = [...new Set(blogs.map(blog => blog.category))].sort()
    setCategories(filter)
  }
  const filterTags = () => {
    const filter = [...new Set(blogs.map(blog => blog.tags))].sort()
    setTags(filter)
  }


  return (
    <Container w={[350, 500, 768, 997]} m={2} maxW="997px">
      <Box className="blog-form-title">
        <Link to={'/profile'}>
          <Button variant='ghost' m="0" p="1">Back</Button>
        </Link>
        <h1>{formName}</h1>
      </Box>
      <Box className="blog-form">
        <form onSubmit={handleSubmit}>
          <Box>
            {/* Title */}
            <label htmlFor="title">Title <span className="required">*</span></label>
            <Input
              type='text'
              name="title"
              className="blog-form-input"
              onChange={handleChange}
              value={formFields.title}
              placeholder="Title"
              required
            />
            {/* Category */}

            <label htmlFor="category">Category <span className="required">*</span></label>
            <Select borderColor="#9CB42F" name="category" onChange={handleChange} required>
              <option value='Select Category'>{formFields.category ? formFields.category : 'Select Category'
              }</option>
              {categories.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              })}
            </Select>
            {/* Tags */}
            <label htmlFor="tags">Tags <span className="required">*</span></label>
            <Select borderColor="#9CB42F" name="tags" onChange={handleChange} required>
              <option value='Select Tags'>{formFields.tags ? formFields.tags : 'Select Tags'
              }</option>
              {tags.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              })}

            </Select>
            {/* Description */}
            <label htmlFor="description">Description <span className="required">*</span></label>
            <Input
              type='text'
              name="description"
              className="blog-form-input"
              onChange={handleChange}
              value={formFields.description}
              placeholder="Description"
              required
            />
            {/* Thumbnail */}
            <ImageUpload
              formFields={formFields}
              setFormFields={setFormFields}
            />
            {/* Article */}
            <label htmlFor="article">Article <span className="required">*</span></label>
            <NewEditor
              formFields={formFields}
              setFormFields={setFormFields}
            />
            <Button onSubmit={handleSubmit} type="submit" className="btn-green">{formName}</Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default BlogForm