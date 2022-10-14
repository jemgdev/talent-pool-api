import supertest from 'supertest'
import index from '../src/index'
import mongoose from 'mongoose'
import Image from '../src/core/image/infrastructure/mongoose/image.model'
import prisma from '../src/core/person/infrastructure/prisma/prisma.connection'
import { imageUseCase, initialPersons, personUseCase, getTheFirstImageSaved, getTheFirstUserSaved } from './helpers'
import fs from 'node:fs/promises'

const { app, server } = index
const api = supertest(app)

beforeAll(async () => {
  for (const person of initialPersons) {
    const { image } = person
    if (!image) {
      throw new Error('Need images')
    }
    const { sourceUrl, url } = image

    await fs.copyFile(sourceUrl, url)
  }
})

beforeEach(async () => {
  await Image.deleteMany({})
  await prisma.person.deleteMany({})

  for (const person of initialPersons) {
    const { age, cityOfBirth, idNumber, idType, lastname, name, image } = person
    if (!image) {
      throw new Error('Need images')
    }
    const personSaved = await personUseCase.savePerson(name, lastname, age, idType, idNumber, cityOfBirth)
    if (!personSaved) {
      throw new Error('Error person was not saved')
    }
    await imageUseCase.uploadImageByPerson(image.url, image.fileName, personSaved.personId, image.title, image.description, false)
  }
})

describe('GET list all images', () => {
  test('List all images successfully', async () => {
    const response = await api.get('/api/v1/images')
      .expect('Content-Type', /application\/json/)
      .expect(200)
    
    expect(response.body.data).toHaveLength(3)
  })
})

describe('GET a image by id', () => {
  test('Get a image successfully', async () => {
    const image = await getTheFirstImageSaved()
    const response = await api.get(`/api/v1/images/${image.imageId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data.title).toBe('Foto de recuerdo')
  })

  test('Get a image that imageId not exists', async () => {
    const response = await api.get('/api/v1/images/23e32er23e23e23')
      .expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body.message).toBe('Image not found')
  })
})

describe('GET images from personId', () => {
  test('Get images by personId successfully', async () => {
    const person = await getTheFirstUserSaved()
    const response = await api.get(`/api/v1/images/persons/${person.personId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data).toHaveLength(1)
  })

  test('Must fail when sends a personId that non exists', async () => {
    const response = await api.get('/api/v1/images/persons/iauqsdbyu8asdqw3')
      .expect('Content-Type', /application\/json/)
      .expect(404)
    
    expect(response.body.message).toBe('Person not found')
  })
})

describe('POST a image', () => {
  test('Upload a image jpg, jpeg, and png successfully', async () => {
    const person = await getTheFirstUserSaved()
    const response = await api.post(`/api/v1/images/${person.personId}`)
      .attach('image', `${__dirname}/images/pose.jpg`)
      .field('title', 'Test image')
      .field('description', 'Test descripcion')
      .set('Content-Type', 'multipart/form-data')
      .expect(201)
    
    expect(response.body.data.personId).toBe(person.personId)
  })

  test('Upload a image where the personId no exists', async () => {
    const response = await api.post('/api/v1/images/qsdhq9983892hh8333')
      .attach('image', `${__dirname}/images/pose.jpg`)
      .expect(404)
    
    expect(response.body.message).toBe('Person not found')
  })

  test('Upload a pdf should fail', async () => {
    const person = await getTheFirstUserSaved()
    const response = await api.post(`/api/v1/images/${person.personId}`)
      .attach('image', `${__dirname}/images/test.pdf`)
      .expect(400)
    
    expect(response.body.message).toBe('The file must be png, jpg or jpeg')
  })
})

describe('PUT an image by imageId', () => {
  test('Update an image by imageId successfully', async () => {
    const image = await getTheFirstImageSaved()
    const response = await api.put(`/api/v1/images/${image.imageId}`)
      .send({
        title: 'Titulo para typescript',
        description: 'description actualizada 1'
      })
      .expect('Content-Type', /application\/json/)
      .expect(200)
    
    expect(response.body.data.title).not.toBe(image.title)
  })

  test('Must return an error message when send a imageId that no exists', async () => {
    const response = await api.put('/api/v1/images/asdasdadasfafafq')
      .send({
        title: 'Titulo para typescript',
        description: 'description actualizada 1'
      })
      .expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body.message).toBe('Image not found')
  })
})

describe('DELETE image by imageId', () => {
  test('Delete animage by imageId successfully', async () =>{
    const image = await getTheFirstImageSaved()
    const response = await api.delete(`/api/v1/images/${image.imageId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data.title).toBe(image.title)
  })

  test('Must got an error message when try to delete by imageId that no exists', async () => {
    const response = await api.delete('/api/v1/images/asdasdadasfafafq')
      .expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body.message).toBe('Image not found')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  await server.close()
  for (const person of initialPersons) {
    const { image } = person
    if (!image) {
      throw new Error('Need images')
    }
    const { url } = image

    await fs.unlink(url)
  }
})