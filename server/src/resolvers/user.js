import UserModel from '../models/user'
import { UserInputError } from 'apollo-server-express'

export default {
    Query: {
        users: async (_, { sort , limit, page, search }, { isAdmin }) => {
            if (!isAdmin) throw new Error('Not Admin')
            const query = {}
            if (search) {
                query.search = {$regex: search, $options: "i"}
            }
            let querySort = 'createdAt'
    
            switch (sort) {
              case 'CREATEDAT':
                  querySort = '-createdAt'
                  break
              case 'UPDATEDAT':
                  querySort = '-updatedAt'
                  break
              case 'NAME':
                  querySort = 'NAME'
                  break
            }          
            const count = await UserModel.countDocuments(query)
            const resPerPage = parseInt(limit) || count
            const pageNumber = parseInt(page) || 1

            const users = await UserModel.find(query)   
                .skip((resPerPage * pageNumber) - resPerPage)
                .limit(resPerPage)
                .sort(querySort) 
    
            return {
                users: users, 
                'currentPage': pageNumber, 
                'pages' : Math.ceil(count / resPerPage), 
                total: count
            }
        },
        user: async (_, { id }) => {
            const user = await UserModel.findById(id).exec()
            return user
        },
    },
    Mutation: {
        deleteUser: async (_, { id }) => {
            const user = await UserModel.findById(id).exec()

            const removedUser = await user.remove()
            if (!removedUser) {
              return false
            }
            return true
        },

    }
}