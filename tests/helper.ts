import supertest from 'supertest'
import intex from '../src/index'

const api = supertest(intex.app)

export const initialPersons = [
  {
    name: 'Josue',
    lastname: 'Medina Garcia',
    idType: 'DNI',
    idNumber: 83929331,
    cityOfBirth: 'Peru',
    age: 21
  },
  {
    name: 'Enzo',
    lastname: 'Villanueva Mendez',
    idType: 'DNI',
    idNumber: 83929332,
    cityOfBirth: 'Peru',
    age: 20
  },
  {
    name: 'Gean',
    lastname: 'Lopez Zevallos',
    idType: 'Pasaporte',
    idNumber: 83929333,
    cityOfBirth: 'Colombia',
    age: 15
  }
]

export const getAllPersons = async () => {
  const response = await api.get('/api/v1/persons').expect('Content-Type', /application\/json/).expect(200)
  return response.body.data
}

export const getTheFirstUserSaved = async () => {
  const response = await api.get('/api/v1/persons').expect('Content-Type', /application\/json/).expect(200)
  return response.body.data[0]
}