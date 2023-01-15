import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Chakra imports
import { Container, Box, SimpleGrid } from '@chakra-ui/react'

const BlogsAll = () => {

  //! State
  const [ blogs, setBlogs ] = useState([])
  const [ errors, setErrors ] = useState(null)

  const [ categories, setCategories ] = useState([])
  const [ tags, setTags ] = useState([])
  const [ filteredBlogs, setFilteredBlogs ] = useState([])
  const [ filteredCategories, setFilteredCategories ] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/blogs')
        setBlogs(data)
      } catch (err) {
        console.log(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    filterDropdowns()
  }, [blogs])

  const filterDropdowns = () => {
    const filterCategories = [ ...new Set(blogs.map(blog => blog.category))].sort()
    const filterTags = [ ...new Set(blogs.map(blog => blog.tags))].sort()
    setCategories(filterCategories)
    setTags(filterTags)
  }

  const handleChange = (e) => {
    const selectedCategory = blogs.filter(blog => {
      return (e.target.value === blog.category || e.target.value === 'all')
    })
    setFilteredCategories(selectedCategory)
    setFilteredBlogs(selectedCategory)
  }

  const handleChangeTags = (e) => {
    const selectedTags = filteredCategories.filter(blog => {
      return (e.target.value === blog.tags || e.target.value === 'all')
    })
    console.log(selectedTags)
    setFilteredBlogs(selectedTags)
  }

  useEffect(() => {
    setFilteredBlogs(blogs)
    setFilteredCategories(blogs)
  }, [blogs])

  return (
    <main className="blogs-all-index">
      <Container m={2} maxW="997px">
        <Box p={1} mb={2} className="blog-index-filter-box">
          <h2 className="blog-index-filter-p">Narrow search by types of<span className="blog-index-filter-selector">
            <select onChange={handleChange} className="filter-blog-dropdown" id="filter-blog-by-category">
              <option id="all" value="all">All</option>
              {categories && 
              categories.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              })}
            </select>
          </span> and show blogs related to<span className="filter-blog-dropdown" id="filter-blog-by-tag">
            <select onChange={handleChangeTags} className="filter-blog-dropdown" id="filter-blog-by-tag">
              <option id="all" value="all">All</option>
              {tags && 
              tags.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              })}
            </select>
          </span></h2> 
        </Box>
        <SimpleGrid minChildWidth="250px" spacing='30px'>
          {filteredBlogs ? 
            filteredBlogs.map(blog => {
              const { _id, title, thumbnail, description } = blog
              return (
                <Link key={_id} to={`/blogs/${_id}`}>
                  <div className="blog-index-card-container">
                    <img className="blog-index-card-img" src={thumbnail} alt={title} />
                    <h3 className="blog-index-card-title">{title}</h3>
                    <p className="blog-index-card-description">{description}</p>
                  </div>
                </Link>
              )
            })
            :
            errors ? <h2>Something went wrong!</h2> : <h2>Loading...</h2>
          }
        </SimpleGrid>
      </Container>
    </main>
  )
}

export default BlogsAll