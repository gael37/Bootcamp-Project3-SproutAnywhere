
import Blog from '../models/blog.js'
import { sendErrors, findBlog } from '../config/helpers.js'
import { NotFound, Unauthorised } from '../config/errors.js'




// * Index route
// Method: GET
// Endpoint: /blogs
// Description: Query the entire blogs collection, to return all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('owner')
    return res.json(blogs)
  } catch (err) {
    sendErrors(res, err)
  }
}

// * Blog category Index route
// Method: GET
// Endpoint: /blogs/category/:category
// Description: Query a specific blog category index, to return all blogs under the specific category.
export const getBlogsCategory = async (req, res) => {
  try {
    const { category } = req.params
    const blog = await Blog.find({ category: category }).populate('owner')
    if (!blog) throw new NotFound('No blogs exist in this category')
    return res.json(blog)
  } catch (err) {
    sendErrors(res, err)
  }
}

// * Blog category Index route
// Method: GET
// Endpoint: /blogs/category/:category/:tags
// Description: Query a specific blog category index, to return all blogs under the specific category.
export const getBlogsCategoryAndTags = async (req, res) => {
  try {
    const { category, tags } = req.params
    const blog = await Blog.find({ category: category, tags: tags }).populate('owner')
    if (!blog || blog.length === 0) throw new NotFound('No blogs with these filter options')
    return res.json(blog)
  } catch (err) {
    sendErrors(res, err)
  }
}

// * Add Blog route
// Method: Post
// Endpoint: /blogs
// Description: add a blog to the collection with create method
export const addBlog = async (req, res) => {
  try {
    const blogWithOwner = { ...req.body, owner: req.currentUser._id }
    const blog = await Blog.create(blogWithOwner)
    return res.status(201).json(blog)
  } catch (err) {
    sendErrors(res, err)
  }
}

// * Single Blog route
// Method: GET
// Endpoint: /blogs/:id
// Description: return a single blog that matches the id from params and using the helper function to findById
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await findBlog(req, res)
    return res.json(blog)
  } catch (err) {
    sendErrors(res, err)
  }
}

// * Update Blog Route
// Method: Put
// Endpoint: /blogs/:id
// Description: Find a specific blog with helper function, and assign req.body with Object.assign and save blog with save method
export const updateBlog = async (req, res) => {
  try {
    const blog = await findBlog(req, res)
    if (!blog) throw new NotFound('Blog not found')
    if (blog && req.currentUser._id.equals(blog.owner._id)) {
      Object.assign(blog, req.body)
      blog.save()
      return res.status(202).json(blog)
    }
    throw new Unauthorised()
  } catch (err) {
    sendErrors(res, err)
  }
}
// * Delete Blog Route
// Method: delete
// Endpoint: /blogs/:id
// Description: Locates the correct blog and removes it from the collection
export const deleteBlog = async (req, res) => {
  try {
    const blog = await findBlog(req, res)
    if (blog) {
      await blog.remove()
      return res.sendStatus(204)
    }
    throw new Unauthorised()
  } catch (err) {
    sendErrors(res, err)
  }
}

export const addBlogReview = async (req, res) => {
  try {
    const blog = await findBlog(req, res)
    if (blog) {
      console.log('user', req.currentUser)
      console.log('username', req.currentUser.username)
      const reviewWithOwner = { ...req.body, owner: req.currentUser._id, username: req.currentUser.username }
      blog.reviews.push(reviewWithOwner)
      await blog.save()
      return res.json(blog)
    }
  } catch (err) {
    sendErrors(res, err)
  }
}