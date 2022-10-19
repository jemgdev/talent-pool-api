import Person from '../domain/person.model'
import PersonPersistanceRepository from '../domain/person.persistance.repository'
import CustomError from '../../shared/custom.error'
import PersonIdGeneratorRepository from '../domain/person.id.generator.repository'

export default class SavePerson {
  private readonly personIdGeneratorRepository: PersonIdGeneratorRepository
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(personIdGeneratorRepository: PersonIdGeneratorRepository, personPersistanceRepository: PersonPersistanceRepository) {
    this.personIdGeneratorRepository = personIdGeneratorRepository
    this.personPersistanceRepository = personPersistanceRepository
  }

  async save (name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string ): Promise<Person | null> {
    const personFound = await this.personPersistanceRepository.getUniquePerson(idType, idNumber)

    if (personFound?.idType === idType && personFound.idNumber) {
      throw new CustomError ('PERSON_403', 'Person', 'The person that you want to create already exists')
    }

    const person = new Person(this.personIdGeneratorRepository ,name, lastname, idType, idNumber, cityOfBirth, age)
    
    try {
      const personSaved = await this.personPersistanceRepository.insertPerson(person)
      return personSaved
    } catch (error) {
      throw new CustomError ('PERSON_400', 'Person error', 'You must to specify all required attributes')
    }
  }
}