import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import IImage from '../../domain/image.interface'

const imageSchema = new Schema<IImage> ({
  imageId: {
    type: String,
    unique: true
  },
  personId: String,
  url: String,
  title: String,
  description: String
}, {
  versionKey: false,
  timestamps: false
})

imageSchema.plugin(uniqueValidator)

export default model('Image', imageSchema)
