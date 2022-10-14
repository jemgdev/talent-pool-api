import PersonIdGeneratorRepository from '../../domain/person.id.generator.repository'
import { v4 as uuid } from 'uuid'

export default class PersonUuidRepository implements PersonIdGeneratorRepository {
  generatePersonId (): string {
    return uuid()
  }
}