import supertest from 'supertest'
import index from '../src/index'
import mongoose from 'mongoose'
import PersonUseCase from '../src/core/person/application/person.usecase'
import PersonPrismaRepository from '../src/core/person/infrastructure/prisma/person.prisma.repository'
import prisma from '../src/connections/prisma.connection'
import { getAllPersons, initialPersons, getTheFirstUserSaved } from './helper'

const personUseCase = new PersonUseCase(new PersonPrismaRepository())
const { app, server } = index
const api = supertest(app)

beforeEach(async () => {
  jest.setTimeout(11000)

  await prisma.person.deleteMany({})

  for (const person of initialPersons) {
    const { age, cityOfBirth, idNumber, idType, lastname, name } = person
    await personUseCase.savePerson(name, lastname, age, idType, idNumber, cityOfBirth)
  }
})

describe('GET all persons', () => {
  test('There are three persons', async () => {
    const persons = await getAllPersons()
    expect(persons).toHaveLength(3)
  })
})

describe('GET persons that are greater or equal to a specific age', () => {
  test('Response must to be return two persons', async () => {
    const response = await api.get('/api/v1/persons').send({ age: 16})
      .expect(200)
    expect(response.body.data).toHaveLength(2)
  })

  test('Sending a string age from body', async () => {
    const response = await api.get('/api/v1/persons').send({ age: '16'})
      .expect(200)
    expect(response.body.data).toHaveLength(2)
  })

  test('Sending an age number from params', async () => {
    const response = await api.get('/api/v1/persons/12')
      .expect(404)
    
    expect(response.body.message).toBe('The person that you want to get was not found')
  })
})

describe('GET a person by ID', () => {
  test('Send from params the person from existing person', async () => {
    const personSaved = await getTheFirstUserSaved()
    const personFound = await api.get(`/api/v1/persons/${personSaved.personId}`)
      .expect(200)
    expect(personFound.body.data.personId).toBe(personSaved.personId)
  })

  test('Send from params a id number that non exists', async () => {
    const response = await api.get('/api/v1/persons/q89dhq9wdq')
      .expect(404)
    expect(response.body.message).toBe('The person that you want to get was not found')
  })
})

describe('GET a person by idType and idNumber', () => {
  test('Get a person successfully', async () => {
    const response = await api.get('/api/v1/persons/identification').send({
      idType: 'DNI',
      idNumber: 83929331
    }).expect(200)

    expect(response.body.data.idType).toBe('DNI')
    expect(response.body.data.idNumber).toBe(83929331)
  })

  test('Get an error message where sends only an idType', async () => {
    const response = await api.get('/api/v1/persons/identification').send({
      idType: 'DNI'
    }).expect(404)

    expect(response.body.message).toBe('You must to especify a idType and a idNumber')
  })

  test('Get an error message where sends only an idNumber', async () => {
    const response = await api.get('/api/v1/persons/identification').send({
      idNumber: 83929331
    }).expect(404)

    expect(response.body.message).toBe('You must to especify a idType and a idNumber')
  })
})

describe('POST a new person', () => {
  test('Send a new person successfully', async () => {
    const response = await api.post('/api/v1/persons/').send({
      name: 'Test',
      lastname: 'JavaScript',
      idType: 'DNI',
      idNumber: 876364422,
      cityOfBirth: 'Peru',
      age: 14
    }).expect(201)

    expect(response.body.data.name).toBe('Test')
  })

  test('Send a person that idType and idNumber already exists', async () => {
    const response = await api.post('/api/v1/persons/').send({
      name: 'Test',
      lastname: 'JavaScript',
      idType: 'DNI',
      idNumber: 83929331,
      cityOfBirth: 'Peru',
      age: 14
    }).expect(403)

    expect(response.body.message).toBe('The person idType and idNumber that you want to create already exists')
  })

  test('Send a person without required attributes', async () => {
    const response = await api.post('/api/v1/persons/').send({
      name: 'Test',
      lastname: 'JavaScript',
      cityOfBirth: 'Peru',
      age: 14
    }).expect(400)

    expect(response.body.message).toBe('You must to specify all required attributes')
  })
})

describe('PUT a person by personId', () => {
  test('Update a user successfully', async () => {
    const personSaved = await getTheFirstUserSaved()
    const response = await api.put(`/api/v1/persons/${personSaved.personId}`).send({
      name: 'Test',
      lastname: 'JavaScript',
      idType: 'DNI',
      idNumber: 839293004,
      cityOfBirth: 'Peru',
      age: 14
    }).expect(200)

    expect(response.body.data.name).not.toBe(personSaved.name)
  })
  
  test('Allow pdate a person without send any data', async () => {
    const person = await getTheFirstUserSaved()
    const response = await api.put(`/api/v1/persons/${person.personId}`).expect(200)

    expect(response.body.data).toStrictEqual(person)
  })

  test('Send an error message where wants to update a person that was no found', async () => {
    const response = await api.put('/api/v1/persons/asdioausdh98asd').send({
      name: 'Test',
      lastname: 'JavaScript',
      idType: 'DNI',
      idNumber: 839293004,
      cityOfBirth: 'Peru',
      age: 14
    }).expect(404)

    expect(response.body.message).toBe('The person that you want to update was not found')
  })

  test('Send an error message where wants to update a persons idNumber that already exists', async () => {
    const person = await getTheFirstUserSaved()
    const response = await api.put(`/api/v1/persons/${person.personId}`).send({
      name: 'Test',
      lastname: 'JavaScript',
      idType: 'DNI',
      idNumber: 83929333,
      cityOfBirth: 'Peru',
      age: 14
    }).expect(403)

    expect(response.body.message).toBe('The person idNumber that you want to update already exists')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  await server.close()
})