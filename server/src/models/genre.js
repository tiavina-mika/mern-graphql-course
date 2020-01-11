import mongoose from 'mongoose'

const Schema = mongoose.Schema

const GenreSchema = new Schema(
    {
        name: {type: String, min: 5, max: 50},
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date},
    }
)

export default mongoose.model('Genre', GenreSchema)