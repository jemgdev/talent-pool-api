import Person from '../domain/person.model'
import PersonPersistanceRepository from '../domain/person.persistance.repository'
import CustomError from '../../shared/custom.error'

export default class UpdatePersonById {
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(personPersistanceRepository: PersonPersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
  }

  async update (personId: string, person: { name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string }): Promise<Person | null> {
    const oldPerson = await this.personPersistanceRepository.getPersonById(personId)

    if (!oldPerson) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to update was not found')
    }

    const newPerson: Person = {
      name: typeof person.name === 'undefined' ? oldPerson.name : person.name,
      lastname: typeof person.lastname === 'undefined' ? oldPerson.lastname : person.lastname,
      idType: typeof person.idType === 'undefined' ? oldPerson.idType : person.idType,
      idNumber: typeof person.idNumber === 'undefined' ? oldPerson.idNumber : person.idNumber,
      cityOfBirth: typeof person.cityOfBirth === 'undefined' ? oldPerson.cityOfBirth : person.cityOfBirth,
      age: typeof person.age === 'undefined' ? oldPerson.age : person.age,
      personId: oldPerson.personId
    }

    try {
      const personUpdated = await this.personPersistanceRepository.updatePersonById(personId, newPerson)
      if (!personUpdated) {
        throw new CustomError ('PERSON_403', 'Person', 'The person idNumber that you want to update already exists')
      }
      return personUpdated
    } catch (error: any) {
      throw new CustomError ('PERSON_403', 'Person', 'The person idNumber that you want to update already exists')
    }
  }
}