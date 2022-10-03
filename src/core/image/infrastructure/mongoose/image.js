import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const imageSchema = new Schema({
  imageId: {
    type: String,
    unique: true
  },
  personId: String,
  url: String,
  title: String,
  description: String
}, {
  _id: false,
  versionKey: false,
  timestamps: false
})

imageSchema.plugin(uniqueValidator)

export default model('Image', imageSchema)
