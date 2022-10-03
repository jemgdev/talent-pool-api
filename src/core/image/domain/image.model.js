import { v4 as uuid } from 'uuid'

export default class Image {
  constructor ({ personId, url, title, description }) {
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
