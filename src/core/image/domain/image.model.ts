import ImageIdGeneratorRepository from './image.id.generator.repository'

export default class Image {
  imageId: string
  personId?: string
  url: string
  title: string
  description: string
  
  constructor (imageIdGeneratorRepository: ImageIdGeneratorRepository ,personId: string, url: string, title: string, description: string) {
    this.imageId = imageIdGeneratorRepository.generateImageId()
    this.personId = personId
    this.url = url
    this.title = title
    this.description = description
  }
}
