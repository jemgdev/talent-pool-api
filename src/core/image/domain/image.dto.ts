import IPerson from '../../person/domain/person.interface'

export default interface ImageDTO {
  imageId: string
  person: IPerson
  url: string
  title: string
  description: string
}