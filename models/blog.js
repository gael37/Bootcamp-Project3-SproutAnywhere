import mongoose from 'mongoose'

const reviewBlogSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  rating: { type: Number, required: false, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  username: { type: String, required: false, maxlength: 300 },
}, {
  timestamps: true,
})

// ! Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, maxlength: 100 },
  category: { type: String, required: true },
  tags: { type: String, required: true },
  description: { type: String, required: true, maxlength: 100 },
  thumbnail: { type: String, requied: true },
  article: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  reviews: [reviewBlogSchema],
}, {
  timestamps: true,
})

export default mongoose.model('Blog', blogSchema)