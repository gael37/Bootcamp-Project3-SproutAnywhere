import { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

// Chakra imports
import { Container, Box, SimpleGrid } from '@chakra-ui/react'
import { Card, CardBody, Image, Heading, Button } from '@chakra-ui/react'


const SucculentsBlogs = () => {
  // ! State
  const [ blogs, setBlogs ] = useState([])
  const [ tags, setTags ] = useState([])
  const [ filteredBlogs, setFilteredBlogs ] = useState([])

  const [ errors, setErrors ] = useState(null)

  const { category } = useParams()

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/category/${category}`)
        setBlogs(data)
      } catch (err) {
        console.log(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    filterTags()
  }, [blogs])

  const filterTags = () => {
    const filter = [ ...new Set(blogs.map(blog => blog.tags))].sort()
    setTags(filter)
  }

  const handleChange = useCallback((e) => {
    const selectedTags = blogs.filter(blog => {
      return (e.target.value === blog.tags || e.target.value === 'all')
    })
    setFilteredBlogs(selectedTags)
  }, [blogs])

  useEffect(() => {
    setFilteredBlogs(blogs)
  }, [blogs])

  // ! JSX
  return (
    <main className="succulents-blog-index">
      <Container m={2} maxW="997px">
        <Box p={1} mb={2} className="blog-index-filter-box">
          <h2 className="blog-index-filter-p">I want to read about<span className="blog-index-filter-selector">
            <select onChange={handleChange} className="filter-blog-by-tag" id="filter-blog-by-tag" placeholder="Pick One">
              <option id="all" value="all">All</option>
              {tags.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              })}
            </select>
          </span></h2> 
        </Box>
        <SimpleGrid minChildWidth="250px" spacing='30px'>
          {filteredBlogs.length > 0 ? 
            <>
              {filteredBlogs.map(b => {
                const { _id, title, createdAt, thumbnail, description } = b
                return (
                  <Link key={_id} to={`/blogs/${_id}`}>
                    <Card align='center' boxShadow='md' className="blog-index-cards">
                      <CardBody>
                        <Image 
                          boxSize='250px'
                          align='center'
                          objectFit='cover' 
                          src={thumbnail} 
                          alt={title} 
                        />
                        <h2 className="blog-index-card-title">{title}</h2>
                        <p className="blog-card-p">Added on: {createdAt}</p>
                        <p className="description-card-p">{description}</p>
                        <button className="blog-card-btn">
                          Read more
                        </button>
                      </CardBody>
                    </Card>
                  </Link>
                )
              })}
            </>
            :
            errors ? <h2>Something went wrong!</h2> : <h2>Loading...</h2>
          }
        </SimpleGrid>  
        
      </Container>
    </main>
  )
}

export default SucculentsBlogs