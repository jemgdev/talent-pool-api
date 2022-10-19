import ListAllPersons from '../src/core/person/application/list.all.persons'
import SavePerson from '../src/core/person/application/save.person'
import PersonPrismaRepository from '../src/core/person/infrastructure/prisma/person.prisma.repository'
import ImageMongooseRespository from '../src/core/image/infrastructure/mongoose/image.mongoose.repository'
import ImageAwsRepository from '../src/core/image/infrastructure/aws/image.aws.repository'
import PersonUuidRepository from '../src/core/person/infrastructure/uuid/person.uuid.repository'
import ImageUuidRepository from '../src/core/image/infrastructure/uuid/image.uuid.repository'
import ListAllImages from '../src/core/image/application/list.all.images'
import UploadImageByPerson from '../src/core/image/application/upload.image.by.person'
import ImageCloudinaryRepository from '../src/core/image/infrastructure/cloudinary/image.cloudinary.respository'

export const listAllPersons = new ListAllPersons(new PersonPrismaRepository())
export const savePerson = new SavePerson(new PersonUuidRepository(), new PersonPrismaRepository())
export const listAllImages = new ListAllImages(new ImageMongooseRespository())
export const uploadImageByPerson = new UploadImageByPerson(new ImageUuidRepository(), new ImageMongooseRespository(), new PersonPrismaRepository(), new ImageCloudinaryRepository())

export default interface IImage {
  imageId?: string
  personId?: string
  fileName: string
  url: string
  sourceUrl: string
  title: string
  description: string
}

export interface IPerson {
  personId?: string
  name: string
  lastname: string
  idType: string
  idNumber: number
  cityOfBirth: string
  age: number
  image: IImage | null
}

export const initialPersons: IPerson[] = [
  {
    name: 'Josue',
    lastname: 'Medina Garcia',
    idType: 'DNI',
    idNumber: 83929331,
    cityOfBirth: 'Peru',
    age: 21,
    image: {
      title: 'Foto de recuerdo',
      description: 'Me gusta esta foto',
      url: `${__dirname}/temp/hola.png`,
      sourceUrl: `${__dirname}/images/hola.png`,
      fileName: 'hola.png'
    }
    
  },
  {
    name: 'Enzo',
    lastname: 'Villanueva Mendez',
    idType: 'DNI',
    idNumber: 83929332,
    cityOfBirth: 'Peru',
    age: 20,
    image: {
      title: 'Foto de recuerdo 1',
      description: 'Me gusta esta foto',
      url: `${__dirname}/temp/carnet.png`,
      sourceUrl: `${__dirname}/images/carnet.png`,
      fileName: 'carnet.png'
    }
  },
  {
    name: 'Gean',
    lastname: 'Lopez Zevallos',
    idType: 'Pasaporte',
    idNumber: 83929333,
    cityOfBirth: 'Colombia',
    age: 15,
    image: {
      title: 'Foto de recuerdo 2',
      description: 'Me gusta esta foto',
      url: `${__dirname}/temp/foto_linkedin.jpg`,
      sourceUrl: `${__dirname}/images/foto_linkedin.jpg`,
      fileName: 'foto_linkedin.jpg'
    }
  }
]

export const getAllPersons = async (): Promise<any> => {
  const persons = await listAllPersons.list()
  
  return persons
}

export const getTheFirstUserSaved = async (): Promise<any> => {
  const persons = await listAllPersons.list()
 
  if (!persons) {
    throw new Error('There are no persons')
  }

  return persons[0]
}

export const getTheFirstImageSaved = async (): Promise<any> => {
  const images = await listAllImages.list()

  if (!images) {
    throw new Error('There are no images')
  }

  return images[0]
}