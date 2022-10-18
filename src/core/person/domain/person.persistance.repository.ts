import Person from './person.model'

export default interface PersonPersistanceRepository {
  getAllPersons: () => Promise<Person[] | null>
  getPersonById: (personId: string) => Promise<Person | null>
  getUniquePerson: (idType: string, idNumber: number) => Promise<Person | null>
  getPersonsGreaterOrEqualToAge: (age: number) => Promise<Person[] | null>
  insertPerson: ({ name, lastname, idType, idNumber, age, cityOfBirth, personId }: Person) => Promise<Person | null>
  updatePersonByIdentification: (idType: string, idNumber: number, { name, lastname, age, idTypeChange, idNumberChange, cityOfBirth }: { name: string, lastname: string, age: number, idTypeChange: string, idNumberChange: number, cityOfBirth: string }) => Promise<string | null>
  deletePersonByIdentification: (idType: string, idNumber: number) => Promise<string | null>
}
