import User from '../models/user'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../utils/security'

export default {
    Mutation: {
        login: async (_, args ) => {
            const { email, password } = args

            const user = await User.findOne({ email })
            
            if (!user) {
                throw new AuthenticationError("Could not find User");
            }        
            const valid = await bcrypt.compare(password, user.password)
        
            if (!valid) throw new Error("Bad password")

            let isAdmin = false

            if (user.role === "ADMIN") {
                isAdmin = true
            }
    
            return {
                isAdmin,
                token: createAccessToken(user),
                user
            };
        },
        signup: async (_, args) => {
            const { username, email, password } = args
            const user = await User.findOne({ email })
            if (user) throw new AuthenticationError()

            const newUser = new User({ username, email, password })
            const hashedPassword = await bcrypt.hash(password, 13)
            newUser.password = hashedPassword
            
            if (newUser.email === process.env.ADMIN_EMAIL) {
                newUser.role = 'ADMIN'
            }
            const result = await newUser.save()
            return result
        },
    }
}