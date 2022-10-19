import PersonPersistanceRepository from '../domain/person.persistance.repository'
import CustomError from '../../shared/custom.error'

export default class UpdatePersonByIdentification {
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(personPersistanceRepository: PersonPersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
  }

  async update (idType: string, idNumber: number, { name, lastname, age, cityOfBirth } : { name: string, lastname: string, age: number, cityOfBirth: string }): Promise<string | null> {
    const oldPerson = await this.personPersistanceRepository.getUniquePerson(idType, idNumber)

    if (!oldPerson) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to update was not found')
    }

    const newPerson = {
      name: typeof name === 'undefined' ? oldPerson.name : name,
      lastname: typeof lastname === 'undefined' ? oldPerson.lastname : lastname,
      cityOfBirth: typeof cityOfBirth === 'undefined' ? oldPerson.cityOfBirth : cityOfBirth,
      age: typeof age === 'undefined' ? oldPerson.age : age,
      personId: oldPerson.personId
    }

    const message = await this.personPersistanceRepository.updatePersonByIdentification(idType, idNumber, newPerson)

    return message
  }
}