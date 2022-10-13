import PersonUseCase from '../src/core/person/application/person.usecase'
import ImageUseCase from '../src/core/image/application/image.usecase'
import PersonPrismaRepository from '../src/core/person/infrastructure/prisma/person.prisma.repository'
import ImageMongooseRespository from '../src/core/image/infrastructure/mongoose/image.mongoose.repository'
import ImageAwsRepository from '../src/core/image/infrastructure/aws/image.aws.repository'
import ImageCloudinaryRepository from '../src/core/image/infrastructure/cloudinary/image.cloudinary.respository'

export const personUseCase = new PersonUseCase(new PersonPrismaRepository())
export const imageUseCase = new ImageUseCase(new ImageMongooseRespository(), new PersonPrismaRepository(), new ImageAwsRepository())

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
  const persons = await personUseCase.listAllPersons()
  
  return persons
}

export const getTheFirstUserSaved = async (): Promise<any> => {
  const persons = await personUseCase.listAllPersons()
 
  if (!persons) {
    throw new Error('There are no persons')
  }

  return persons[0]
}

export const getTheFirstImageSaved = async (): Promise<any> => {
  const images = await imageUseCase.listAllImages()

  if (!images) {
    throw new Error('There are no images')
  }

  return images[0]
}