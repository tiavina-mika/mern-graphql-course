import express from 'express'

import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import resolvers from './resolvers/index'
import typeDefs from './schemas/typeDefs'
import context from './context/context'
import 'dotenv/config'

const port = process.env.PORT
const server = new ApolloServer({ typeDefs, resolvers, context })
const app = express()

server.applyMiddleware({ app })
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.set('useCreateIndex', true)

// The `listen` method launches a web server.
app.listen(port, () => {
  console.log(`🚀  Server ready at http://localhost:${port}/`)
})