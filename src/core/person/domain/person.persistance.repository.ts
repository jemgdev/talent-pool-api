import Person from './person.model'

export default interface PersonPersistanceRepository {
  getAllPersons: () => Promise<Person[] | null>
  getPersonById: (personId: string) => Promise<Person | null>
  getPersonByIdTypeAndIdNumber: (idType: string, idNumber: number) => Promise<Person | null>
  getPersonsGreaterOrEqualToAge: (age: number) => Promise<Person[] | null>
  insertPerson: ({ name, lastname, idType, idNumber, age, cityOfBirth, personId }: Person) => Promise<Person | null>
  updatePersonById: (personId: string, { name, lastname , idType , idNumber , cityOfBirth , age }: Person) => Promise<Person | null>
  deletePersonById: (personId: string) => Promise<Person | null>
  deletePersonByIdNumber: (idNumber: number) => Promise<Person | null>
}
