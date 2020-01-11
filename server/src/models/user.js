import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: {type: String,trim: true,required: 'Name is required', min: 5, max: 50},
        email: {
            type: String,
            trim: true,
            unique: 'Email already exists',
            required: 'Email is required'
        },
        password: {
            type: String,
            min: 6,
            max: 30,
            required: "Password is required"
        },
        role: {type: String, required: true, enum: ['ADMIN', 'USER', 'SUPER_ADMIN'], default: 'USER'},
        createdAt: {type: Date,default: Date.now},
        updatedAt: {type: Date},
        confirmed: {type: Boolean, default: false},
    }
)

const modelAlreadyDeclared = () => {
    try {
      mongoose.model('User')  // it throws an error if the model is still not defined
      return true
    } catch (e) {
      return false
    }
  }
  
let User
if (! modelAlreadyDeclared()) {
    User = mongoose.model('User', UserSchema)
}

export default User
