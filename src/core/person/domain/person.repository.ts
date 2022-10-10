import IPerson from './person.interface'

export default interface PersonRepository {
  getAllPersons: () => Promise<IPerson[] | null>
  getPersonById: (personId: string) => Promise<IPerson | null>
  getPersonByIdTypeAndIdNumber: (idType: string, idNumber: number) => Promise<IPerson | null>
  getPersonsGreaterOrEqualToAge: (age: number) => Promise<IPerson[] | null>
  insertPerson: ({ name, lastname, idType, idNumber, age, cityOfBirth, personId }: IPerson) => Promise<IPerson | null>
  updatePersonById: (personId: string, person: { name: string, lastname: string, idType: string, idNumber: number, cityOfBirth: string, age: number }) => Promise<IPerson | null>
  deletePersonById: (personId: string) => Promise<IPerson | null>
  deletePersonByIdNumber: (idNumber: number) => Promise<IPerson | null>
}
