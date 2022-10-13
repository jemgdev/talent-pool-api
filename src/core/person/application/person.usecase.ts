import CustomError from '../../shared/custom.error'
import IPerson from '../domain/person.interface'
import Person from '../domain/person.model'
import PersonRepository from '../domain/person.repository'

export default class PersonUseCase {
  private readonly personRepository: PersonRepository

  constructor (personRepository: PersonRepository) {
    this.personRepository = personRepository
  }

  async listAllPersons (age?: number): Promise<IPerson[] | null> {
    if (age) {
      const ageNumber = Number(age)
      return await this.personRepository.getPersonsGreaterOrEqualToAge(ageNumber)
    }

    return await this.personRepository.getAllPersons()
  }

  async getUniquePerson (personId: string): Promise<IPerson | null> {
    const person = await this.personRepository.getPersonById(personId)

    if (!person) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to get was not found')
    }

    return person
  }

  async getPersonByIdentification (idType: string, idNumber: number): Promise<IPerson | null> {
    if (!idType || !idNumber) {
      throw new CustomError ('PERSON_404', 'Person', 'You must to especify a idType and a idNumber')
    }

    const person = await this.personRepository.getPersonByIdTypeAndIdNumber(idType, Number(idNumber))
    return person
  }

  async savePerson (name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string ): Promise<IPerson | null> {
    const person = new Person(name, lastname, idType, idNumber, cityOfBirth, age)
    try {
      const personSaved = await this.personRepository.insertPerson(person)
      return personSaved
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new CustomError ('PERSON_403', 'Person', 'The person idType and idNumber that you want to create already exists')
      }
      else if (error.name === 'Error') {
        throw new CustomError ('PERSON_400', 'Person error', 'You must to specify all required attributes')
      }
      throw new CustomError ('PERSON_404', 'Person error', 'There was an unexpected error with the person service')
    }
  }

  async updatePerson (personId: string, person: { name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string }): Promise<IPerson | null> {
    const oldPerson = await this.personRepository.getPersonById(personId)

    if (!oldPerson) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to update was not found')
    }

    const newPerson = {
      name: typeof person.name === 'undefined' ? oldPerson.name : person.name,
      lastname: typeof person.lastname === 'undefined' ? oldPerson.lastname : person.lastname,
      idType: typeof person.idType === 'undefined' ? oldPerson.idType : person.idType,
      idNumber: typeof person.idNumber === 'undefined' ? oldPerson.idNumber : person.idNumber,
      cityOfBirth: typeof person.cityOfBirth === 'undefined' ? oldPerson.cityOfBirth : person.cityOfBirth,
      age: typeof person.age === 'undefined' ? oldPerson.age : person.age
    }

    try {
      const personUpdated = await this.personRepository.updatePersonById(personId, newPerson)
      if (!personUpdated) {
        throw new CustomError ('PERSON_403', 'Person', 'The person idNumber that you want to update already exists')
      }
      return personUpdated
    } catch (error: any) {
      throw new CustomError ('PERSON_403', 'Person', 'The person idNumber that you want to update already exists')
    }
  }

  async deletePersonById (personId: string): Promise<IPerson | null> {
    try {
      const personDeleted = await this.personRepository.deletePersonById(personId)
      return personDeleted
    } catch (error: any) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to delete was not found')
    }
    
  }

  async deletePersonByIdNumber (idNumber: number): Promise<IPerson | null> {
    try {
      const personDeleted = await this.personRepository.deletePersonByIdNumber(idNumber)
      return personDeleted
    } catch (error: any) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to delete was not found')
    }
    
  }
}
