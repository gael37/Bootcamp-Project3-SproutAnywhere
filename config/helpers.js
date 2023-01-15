import { NotFound, Unauthorised } from './errors.js'
import { CastError } from 'mongoose'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import Plant from '../models/plant.js'

// We will return specific error messages for the user so we create a sendErrors function that we will reuse in our controllers.
export const sendErrors = (res, err) => {
  console.log(err)
  console.log('ERR MESSAGE', err.message)
  console.log('ERR NAME', err.name)
  console.log('ERR STATUS', err.status)
  if (err instanceof NotFound || err instanceof Unauthorised) {
    return res.status(err.status).json({ message: err.message })
  } else if (err instanceof CastError) {
    return res.status(400).json({ message: err.message })
  } else if (err.name === 'ValidationError') {
    return res.status(422).json({ message: err.errors ? err.errors : err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: err.message })
  } else {
    return res.status(500).json({ message: err.message })
  }
}

// Helper Function
// Selects blog by Id with findById(id) and reuse when need to find by id
export const findBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await Blog.findById(id).populate('owner')
    if (!blog) throw new NotFound('Blog not found')
    return blog
  } catch (err) {
    sendErrors(res, err)
  }
}

export const findAllUsers = async (_req, res) => {
  try {
    const users = await User.find()
    if (!users) throw new NotFound('User not found')
    console.log(users)
    res.json(users)
    return users
  } catch (err) {
    sendErrors(res, err)
  }
}

export const findSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new NotFound('User not found')
    console.log(user)
    return res.json(user)
  } catch (err) {
    sendErrors(res, err)
  }
}

export const findPlant = async (req, res, populations) => {
  try {
    const { id } = req.params
    const plant = await Plant.findById(id)
    if (!plant) throw new NotFound('Plant not found')
    if (populations && populations.length) {
      const populationPromises = populations.map(population => plant.populate(population))
      await Promise.all(populationPromises)
    }
    return plant
  } catch (err) {
    sendErrors(res, err)
  }
}