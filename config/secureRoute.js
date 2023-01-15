import { Unauthorised } from './errors.js'
import { sendErrors } from './helpers.js'
// import { secret } from './environment.js'
import jwt from 'jsonwebtoken' // This is needed for the jwt.verify method
import User from '../models/user.js'

import {} from 'dotenv/config'

// Authentication middleware
// This will be passed onto any endpoint that we want to secure

export default async (req, res, next) => {
  try {
    // 1. Ensure the authorization header was sent with the requests
    const auth = req.headers.authorization
    // 2. If it's not, we'll throw an unauthorised error
    if (!auth) {
      console.log('MISSING HEADERS')
      throw new Unauthorised('Missing headers')
    }

    // 3. If auth header is present, we'll get the token in the correct format by removing the "Bearer " from the beginning
    const token = auth.replace('Bearer ', '')

    // 4. Now we have just the token saved to a variable, we'll use jwt.verify(), passing in the token and checking if it is valid
    // 5. verify method also takes in the secret, if the token was generated with a different secret, then it will be invalidated
    const payload = jwt.verify(token, process.env.SECRET)

    // 6. If the token is valid, then we'll use the payload sub to identify which user is making the request
    // 7. We'll query the model User using the payload sub, if it returns a user, we will pass the request to the controller
    const userToVerify = await User.findById(payload.sub)
    console.log(userToVerify)

    // 8. If no user is found, this means the token was valid, but the user no longer exists, so we will would invalidate the request
    if (!userToVerify) {
      console.log('TOKEN VALID BUT USER DOES NOT EXIST')
      throw new Unauthorised('User not found')
    }

    // 9. Before we pass to the next piece of middleware, we want to add a key to the req object that holds the validated user as a value. This will be accessible in any future middleware. After this secureRoute has passed to the next() it hits our controller and we will have access the the validated user document
    req.currentUser = userToVerify

    // 10. At this point, the token has been verified, so has the user, and so we pass to the next piece of middleware which is our controller
    next()


  } catch (err) {
    sendErrors(res, err)
  }
}