import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 30 },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

userSchema.virtual('createdBlogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'owner',
})

userSchema.virtual('createdPlants', {
  ref: 'Plant',
  localField: '_id',
  foreignField: 'owner',
})

userSchema.set('toJSON', {
  // First argument passed into the transform method is the document we just queried, which means we can actually manipulate the document stored in the collection
  // Secondly, in this instance we don't want to update the document itself, because those changes are permanent. So we'll use second argument which is a json version of the document we queried. Any changes made to this would not be permanent and simply would apply to the json being returned to the user
  transform(_doc, json) {
    // json is a javascript object that we want to remove the password key of
    // We can do that as below, 
    delete json.password
    return json
  },
  virtuals: true,
})

// We set passwordConfirmation as a virtual field in userSchema, as we will use it but won't store it.
// We set it equal to the value of the field filled by the user.
// The '_' is for avoiding an infinite loop. It asks the setter to set the value of the key 'passwordConfirmation' only once.
userSchema
  .virtual('passwordConfirmation')
  .set(function (fieldValue) {
    console.log('confirmation password: ' + fieldValue)
    this._passwordConfirmation = fieldValue
  })

// Just before the default validation we run a pre-validation to check if the user is effectively attempting to create or modify the password.
// We also check that password field matches passwordConfirmation field.
// We pass on the information to the next piece of middleware using the next function.
userSchema
  .pre('validate', function (next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'Passwords do not match')
    }
    next()
  })

// We save the modified or created password in a hashed form.
userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
      console.log('password hashed: ' + this.password)
    }
    next()
  })

// We set a mongoose method that validates the password. We will reuse that method when the user sends a request where passing the password is necesary, such as loging.
userSchema.methods.validatePassword = function (plainTextPassword) {
  return bcrypt.compareSync(plainTextPassword, this.password)
}

export default mongoose.model('User', userSchema)