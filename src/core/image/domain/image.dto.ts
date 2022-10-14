import Person from '../../person/domain/person.model'

export default interface ImageDTO {
  imageId: string
  person: Person
  url: string
  title: string
  description: string
}