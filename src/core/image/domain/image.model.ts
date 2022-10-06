import { v4 as uuid } from 'uuid'
import IImage from './image.interface'

export default class Image implements IImage {
  imageId: string
  personId: string
  url: string
  title: string
  description: string
  
  constructor (personId: string, url: string, title: string, description: string) {
    this.imageId = uuid()
    this.personId = personId
    this.url = url
    this.title = title
    this.description = description
  }

  getImage () {
    return {
      imageId: this.imageId,
      personId: this.personId,
      url: this.url,
      title: this.title,
      description: this.description
    }
  }
}
