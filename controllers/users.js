import { NotFound, Unauthorised } from '../config/errors.js'
import { sendErrors } from '../config/helpers.js'
import User from '../models/user.js'

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id)
    if (user) {
      if (req.body.password !== req.body.passwordConfirmation || !req.body.password || !req.body.passwordConfirmation) {
        throw new Unauthorised
      }
      Object.assign(user, req.body)
      user.save()
      console.log('User updated!')
      return res.status(202).json(user)
    }
  } catch (err) {
    return res.status(422).json({ message: err.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    // Population is required on this virtual field because it performed a lookup on another collection
    // If the value set did not perform a lookup (like avgField on the album schema) it wouldn't need to be populated
    const loggedInUser = await User.findById(req.currentUser._id).populate('createdPlants').populate('createdBlogs')
    if (!loggedInUser) throw new NotFound('User not found')
    return res.json(loggedInUser)
  } catch (err) {
    sendErrors(res, err)
  }
}