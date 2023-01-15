
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import parse from 'html-react-parser'
import { getToken, isOwner } from '../../../helpers/auth'
import fbLogo from '../../../assets/facebook.svg'
import igLogo from '../../../assets/instagram.svg'
import pinterestLogo from '../../../assets/pinterest.svg'
import twitterLogo from '../../../assets/twitter.svg'
import whatsAppLogo from '../../../assets/whatsapp.svg'
import moment from 'moment'

// Chakra imports
import { Container, Box, Image, Button, ButtonGroup } from '@chakra-ui/react'

const BlogSingle = () => {
  // ! State
  const [blog, setBlog] = useState(null)
  const [article, setArticle] = useState(null)
  const [errors, setErrors] = useState(null)
  const [reviewField, setReviewField] = useState({
    text: '',
  })

  const { blogsId } = useParams()
  const navigate = useNavigate()

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${blogsId}`)
        setArticle(data.article)
        setBlog(data)
      } catch (err) {
        console.log(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [blogsId])


  const deleteBlog = async (e) => {
    try {
      await axios.delete(`/api/blogs/${blogsId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/blogs/category/${blog.category}`)
    } catch (err) {
      console.log(err)
    }
  }
  function socialLinks(e) {
    window.open(e.target.id, '_blank')
  }

  const handleChange = (e) => {
    const updatedReviewField = {
      ...reviewField,
      [e.target.name]: e.target.value,
    }
    setReviewField(updatedReviewField)
    if (errors) setErrors('')
  }

  const handleClick = async (e) => {
    try {
      console.log(blogsId)
      const { data } = await axios.post(`/api/blogs/${blogsId}/review`, reviewField, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setBlog(data)
      setReviewField({
        text: '',
      })
      console.log('review SUCCESS ->', data)
    } catch (err) {
      console.log('review FAIL ->', err)
      setErrors(err.response.data)
    }
  }


  return (
    <main className="single-blog">
      <Container w={[350, 500, 768, 997]} m={2} maxW="997px">
        {blog ?
          <>
            <Link to={'/blogs'}>
              <Button variant='ghost' m="0" p="1">Back</Button>
            </Link>
            <Box mt={1}>
              <h1>{ blog.title }</h1>
              <p className="blog-single-created-by">{ moment(blog.createdAt).format('MM-DD-YYYY') } | Written by: {blog.owner.username} </p>
            </Box>
            <Box>
              <Image src={blog.thumbnail} alt={blog.title} />
            </Box>
            <div className="social-icons">
              <img onClick={socialLinks}  id={`https://www.facebook.com/share.php?u=sproutanywhere.com/blogs/${blogsId}`} className="social-imgs" src={fbLogo} alt='FB logo' />
              <img onClick={socialLinks} id={'https://twitter.com/share?ref_src=twsrc%5Etfw'} className="social-imgs"  src={twitterLogo} alt='Twitter logo' />
              <img onClick={socialLinks} id={'http://www.instagram.com/sproutanywhere'} className="social-imgs" src={igLogo} alt='IG logo' />
              <img onClick={socialLinks} id={'https://www.pinterest.com/sproutanywhere'} className="social-imgs"  src={pinterestLogo} alt='Pinterest logo' />
              <img onClick={socialLinks} id={`whatsapp://send?text=sproutanywhere.com/blogs/${blogsId}`} className="social-imgs"  src={whatsAppLogo} alt='whatsApp logo' />
            </div>
            <Box className="blog-article">
              {article && parse(article)}
            </Box>
            <Box mb={2}>
              {/* This checks if the owner of the blog is viewing the page, and if so, displays the edit/delete buttons */}
              {isOwner(blog.owner._id) &&
                <ButtonGroup mt={3} gap='2'>
                  <Link to={`/blogs/${blogsId}/edit`}><Button className="btn-green">Edit</Button></Link>
                  <Button onClick={deleteBlog} colorScheme='red'>Delete</Button>
                </ButtonGroup>
              }
            </Box>
            <Box>
              <hr></hr>
              <p className="review-section">Any comments ?</p>
              {blog.reviews.length > 0 &&
                blog.reviews.map(review => {
                  return (
                    <div key={review._id} className='review-flex'>
                      <div className='review-details'>
                        <p><span>{review.username}</span></p>
                        <p id='review-date'>{Date().toString().split('G').slice(0, 1).join()}</p>
                      </div>
                      <p id='review-text'>{review.text}</p>
                    </div>
                  )
                })
              }
              <div className='input-review-flex'>
                <input
                  type="text"
                  name="text"
                  onChange={handleChange}
                  value={reviewField.text}
                  placeholder="Comment"
                />
                <button className="btn-post" onClick={handleClick}>Post comment</button>
              </div>
            </Box>
          </>
          :
          errors ? <h2>Something went wrong!</h2> : <h2>Loading...</h2>
        }
      </Container>
    </main>
  )
}

export default BlogSingle