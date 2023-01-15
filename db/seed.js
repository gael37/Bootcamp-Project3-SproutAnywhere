import mongoose from 'mongoose'
// import { dbURI } from '../config/environment.js'
import Plant from '../models/plant.js'
import plantData from './data/plants.js'
import User from '../models/user.js'
import userData from './data/users.js'
import Blog from '../models/blog.js'
import blogData from './data/blogs.js'

import {} from 'dotenv/config'

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('🚀 Database connected!')

    await mongoose.connection.db.dropDatabase()
    console.log('👍 Database dropped!')

    const users = await User.create(userData)
    console.log(`👤 Users collection seeded with ${users.length} users!`)

    const plantsWithOwners = plantData.map(plant => {
      return { ...plant, owner: users[1]._id }
    })

    const blogsWithOwners = blogData.map(blog => {
      return { ...blog, owner: users[0]._id }
    })

    const plants = await Plant.create(plantsWithOwners)
    console.log(`🌱 Plants collection seeded with ${plants.length} plants`)

    const blogs = await Blog.create(blogsWithOwners)
    // console.log(blogsWithOwners)
    console.log(`Blogs collection seeded with ${blogs.length} users!`)
    console.log(users)
    console.log(plants)
    console.log(blogs)

    await mongoose.connection.close()
    console.log('👋 Goodbye!')

  } catch (err) {
    console.log('🆘 Something went wrong')
    console.log(err)
    await mongoose.connection.close()
  }
}
seedDatabase()