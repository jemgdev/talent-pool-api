export default interface ImageDTO {
  imageId: string
  person: {
    name: string,
    lastname: string,
    idType: string,
    idNumber: number,
    cityOfBirth: string,
    age: number
  }
  url: string
  title: string
  description: string
}