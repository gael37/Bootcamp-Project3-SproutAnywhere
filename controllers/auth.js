import User from '../models/user.js'
import { Unauthorised } from '../config/errors.js'
import jwt from 'jsonwebtoken'
// import { secret } from '../config/environment.js'
import { sendErrors } from '../config/helpers.js'

import {} from 'dotenv/config'

// When the user registers, we create a new document that is an instance of userSchema called 'User' model.
// We use the mongoose method 'create', passing in as an argument the object body sent by the user.
// When registering succesfull we return a welcome message to the user.
export const registerUser = async (req, res) => {
  try {
    console.log(req.body)
    const newUser = await User.create(req.body)
    return res.status(202).json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    return res.status(422).json({ message: err.message })
  }
}

// For the login controller, we start by searching the user in the database which email matches the email field passed by the user, using the method findOne.
export const loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body
    const userToLogin = await User.findOne({ email: email })

    console.log('email: ' + email)
    console.log('password: ' + password)
    // if there is no matching user or if our custom password validation method returns false, we send a specific error to the user.
    if (!userToLogin || !userToLogin.validatePassword(password)) {
      throw new Unauthorised()
    }
    // if the user is found, we send a welcome message to the user with a authentication token made of the user id, the username and the secret string.
    const payload = {
      sub: userToLogin._id,
      username: userToLogin.username,
    }

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '7 days' })
    console.log('id: ' + payload.sub)
    return res.json({ message: `Welcome back ${userToLogin.username}`, token: token, sub: `${payload.sub}` })
  } catch (err) {
    sendErrors(res, err)
  }
}