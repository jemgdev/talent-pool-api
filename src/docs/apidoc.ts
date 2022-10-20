import { getAllPersons, getAllPersonsAge, getUniquePerson, createPerson, updatePerson, deletePerson, ResponsePersonArray, ResponsePersonObject, ResponsePerson } from './persons'
import { getAllImages, getAnImageById, getImagesFromPerson, createImage, updateImage, deleteImage, ResponseImageArray, ResponseImageObject } from './images'

const apiDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'Talent Pool API',
    version: '1.0.0',
    description: 'An API that provide CRUD from person and image entities',
    contact: {
      name: 'Josué Medina',
      email: 'josue.medina@pragma.com.co',
      url: 'https://portfolio-jemgdev.vercel.app/'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ],
  tags: [
    {
      name: 'Persons'
    },
    {
      name: 'Images'
    }
  ],
  paths: {
    '/api/v1/persons': {
      get: getAllPersons,
      post: createPerson
    },
    '/api/v1/persons/age/{ageNumber}': {
      get: getAllPersonsAge
    },
    '/api/v1/persons/{idType}/{idNumber}': {
      get: getUniquePerson,
      put: updatePerson,
      delete: deletePerson
    },
    '/api/v1/images': {
      get: getAllImages
    },
    '/api/v1/images/{imageId}': {
      get: getAnImageById,
      put: updateImage,
      delete: deleteImage
    },
    '/api/v1/images/{idType}/{idNumber}': {
      post: createImage
    },
    '/api/v1/images/persons/{idType}/{idNumber}': {
      get: getImagesFromPerson,
    }
  },
  components: {
    schemas: {
      ResponsePersonArray,
      ResponsePersonObject,
      ResponseImageArray,
      ResponseImageObject,
      ResponsePerson
    }
  }
}

export { apiDocumentation }