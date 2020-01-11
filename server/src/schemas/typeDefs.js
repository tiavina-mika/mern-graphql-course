import {gql} from 'apollo-server-express'


export default gql`
    type Query {
        genres (sort: String, limit: Int, page: Int, search: String): PaginatedGenre,
        genre (id: ID!): Genre,

        users (sort: String, limit: Int, page: Int, search: String): PaginatedUser,
        user (id: ID!): User,      
    }
    type Mutation {
        addGenre (name: String! ): Genre,
        editGenre (id: ID!, name: String! ): Genre,
        deleteGenre (id: ID!): Boolean!,

        signup (username: String!, email: String!, password: String! ): User,
        login (email: String!, password: String!): AuthPayload,
        deleteUser (id: ID!): Boolean!,
    }
    scalar Date

    type Genre {
        id: ID!
        name: String
        createdAt: Date
        updatedAt: Date
    }  
    type User {
        id: ID!
        username: String!
        email: String!
        role: String
        password: String
        confirm: Boolean
        createdAt: Date
        updatedAt: Date
    }  

    type PaginatedGenre {
        genres: [Genre]
        currentPage: Int
        pages: Int
        total: Int
    }

    type PaginatedUser {
        users: [User]
        currentPage: Int
        pages: Int
        total: Int
    }

    type AuthPayload {
        token: String
        isAdmin: Boolean
        user: User
    }
`