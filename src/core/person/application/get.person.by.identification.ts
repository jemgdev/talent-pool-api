import Person from '../domain/person.model'
import PersonPersistanceRepository from '../domain/person.persistance.repository'
import CustomError from '../../shared/custom.error'

export default class GetPersonByIdentification {
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(personPersistanceRepository: PersonPersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
  }

  async getPerson (idType: string, idNumber: number): Promise<Person | null> {
    if (!idType || !idNumber) {
      throw new CustomError ('PERSON_404', 'Person', 'You must to especify a idType and a idNumber')
    }

    const person = await this.personPersistanceRepository.getUniquePerson(idType, Number(idNumber))
    
    if (!person) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to get was not found')
    }

    return person
  }
}