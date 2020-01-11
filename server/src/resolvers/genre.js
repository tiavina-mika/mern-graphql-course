import GenreModel from '../models/genre'
import { UserInputError } from 'apollo-server-express'

export default {
    Query: {
        genres: async (_, { sort , limit, page, search }, { isAdmin, currentUser }) => {
            if (!currentUser || !isAdmin) throw new Error('Not Admin')
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
            const count = await GenreModel.countDocuments(query)
            const resPerPage = parseInt(limit) || count
            const pageNumber = parseInt(page) || 1

            const genres = await GenreModel.find(query)   
                .skip((resPerPage * pageNumber) - resPerPage)
                .limit(resPerPage)
                .sort(querySort) 
    
            return {
                genres: genres, 
                'currentPage': pageNumber, 
                'pages' : Math.ceil(count / resPerPage), 
                total: count
            }
        },
        genre: async (_, { id }) => {
            const genre = await GenreModel.findById(id).exec()
            return genre
        },
    },
    Mutation: {
        addGenre: async (_, args) => {
            const { name } = args
 
            const genre = new GenreModel({name});

            try {
                await genre.save()
            } catch (e) {
                console.log('e: ', e);
            }
            return genre;
        },
        editGenre: async (_, args ) => {
            const { id, name } = args
            const genre = await GenreModel.findById(id).exec()
            genre.set({ name })
            genre.updatedAt = Date.now()
           
            try {
                await genre.save()
            } catch (e) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return genre
        },
        deleteGenre: async (_, { id }) => {
            const genre = await GenreModel.findById(id).exec()

            const removedGenre = await genre.remove()
            if (!removedGenre) {
              return false
            }
            return true
        },

    }
}