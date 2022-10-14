import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import Image from '../../domain/image.model'

const imageSchema = new Schema<Image> ({
  imageId: {
    type: String,
    unique: true,
    required: true
  },
  personId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: false
})

imageSchema.plugin(uniqueValidator)

export default model('Image', imageSchema)
