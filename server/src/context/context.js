import { verify } from "jsonwebtoken";
import UserModel from "../models/user"

export default async ({ req }) => {
  const bearer = req.headers.authorization || ""
  if (bearer !== "" && bearer.toLowerCase().indexOf("bearer") === -1) {
    throw new Error("Invalid Authorization header")
  }
  let user = null
  let currentUser = null
  let isAdmin = false
  if (bearer !== "") {
    const token = bearer.split(" ")[1]
    user = await verify(token, process.env.ACCESS_TOKEN_SECRET);
    currentUser = await UserModel.findOne({ email: user.email })
    if (currentUser && currentUser.role === "ADMIN") isAdmin = true 
  }
  return { user, currentUser, isAdmin }
}
