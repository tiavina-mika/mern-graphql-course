import { sign } from "jsonwebtoken"
import bcrypt from 'bcryptjs'

export const createAccessToken = (user) => {
  return sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10h"})
}

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 13)
}
