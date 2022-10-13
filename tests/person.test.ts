import supertest from 'supertest'
import index from '../src/index'
import mongoose from 'mongoose'
import prisma from '../src/connections/prisma.connection'
import { getAllPersons, initialPersons, getTheFirstUserSaved, personUseCase } from './helpers'

const { app, server } = index
const api = supertest(app)


beforeEach(async () => {
  jest.setTimeout(30000)

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
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data).toHaveLength(2)
  })

  test('Sending a string age from body', async () => {
    const response = await api.get('/api/v1/persons').send({ age: '16'})
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data).toHaveLength(2)
  })

  test('Sending an age number from params', async () => {
    const response = await api.get('/api/v1/persons/12')
      .expect('Content-Type', /application\/json/)
      .expect(404)
    
    expect(response.body.message).toBe('The person that you want to get was not found')
  })
})

describe('GET a person by ID', () => {
  test('Send from params the person from existing person', async () => {
    const personSaved = await getTheFirstUserSaved()
    const personFound = await api.get(`/api/v1/persons/${personSaved.personId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)
      
    expect(personFound.body.data.personId).toBe(personSaved.personId)
  })

  test('Send from params a id number that non exists', async () => {
    const response = await api.get('/api/v1/persons/q89dhq9wdq')
      .expect('Content-Type', /application\/json/)
      .expect(404)
    
    expect(response.body.message).toBe('The person that you want to get was not found')
  })
})

describe('GET a person by idType and idNumber', () => {
  test('Get a person successfully', async () => {
    const response = await api.get('/api/v1/persons/identification').send({
      idType: 'DNI',
      idNumber: 83929331
    }).expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data.idType).toBe('DNI')
    expect(response.body.data.idNumber).toBe(83929331)
  })

  test('Get an error message where sends only an idType', async () => {
    const response = await api.get('/api/v1/persons/identification').send({
      idType: 'DNI'
    }).expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body.message).toBe('You must to especify a idType and a idNumber')
  })

  test('Get an error message where sends only an idNumber', async () => {
    const response = await api.get('/api/v1/persons/identification').send({
      idNumber: 83929331
    }).expect('Content-Type', /application\/json/)
      .expect(404)

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
    }).expect('Content-Type', /application\/json/)
      .expect(201)

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
    }).expect('Content-Type', /application\/json/)
      .expect(403)

    expect(response.body.message).toBe('The person idType and idNumber that you want to create already exists')
  })

  test('Send a person without required attributes', async () => {
    const response = await api.post('/api/v1/persons/').send({
      name: 'Test',
      lastname: 'JavaScript',
      cityOfBirth: 'Peru',
      age: 14
    }).expect('Content-Type', /application\/json/)
      .expect(400)

    expect(response.body.message).toBe('You must to specify all required attributes')
  })
})

describe('PUT a person by personId', () => {
  test('Update a person successfully', async () => {
    const personSaved = await getTheFirstUserSaved()
    const response = await api.put(`/api/v1/persons/${personSaved.personId}`).send({
      name: 'Test2222',
      lastname: 'JavaScript',
      idType: 'DNI',
      idNumber: 839293004,
      cityOfBirth: 'Peru',
      age: 14
    }).expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data.name).not.toBe(personSaved.name)
  })
  
  test('Allow pdate a person without send any data', async () => {
    const person = await getTheFirstUserSaved()
    const response = await api.put(`/api/v1/persons/${person.personId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

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
    }).expect('Content-Type', /application\/json/)
      .expect(404)

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
    }).expect('Content-Type', /application\/json/)
      .expect(403)
    
    expect(response.body.message).toBe('The person idNumber that you want to update already exists')
  })
})

describe('DELETE a person by personId', () => {
  test('Delete person successfully', async () => {
    const person = await getTheFirstUserSaved()
    const response = await api.delete(`/api/v1/persons/${person.personId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data.personId).toBe(person.personId)
  })

  test('Delete person where not found', async () => {
    const response = await api.delete('/api/v1/persons/38ehj83hr89hqwed')
      .expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body.message).toBe('The person that you want to delete was not found')
  })
})

describe('DELETE a person by idNumber', () => {
  test('Delete a person successfully', async () => {
    const person = await getTheFirstUserSaved()
    const response = await api.delete('/api/v1/persons/').send({
      idNumber: person.idNumber
    }).expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data.personId).toBe(person.personId)
  })

  test('Delete a person where idNumber does not exists', async () => {
    const response = await api.delete('/api/v1/persons/').send({
      idNumber: 283877984
    }).expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body.message).toBe('The person that you want to delete was not found')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  await server.close()
})