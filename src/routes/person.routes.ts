import { Router } from 'express'
import { getAllPersons, getUniquePerson, createPerson, updatePerson, deletePersonByIdTypeAndNumber, getPersonsThatAge } from '../controllers/person.controller'
const personRouter = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    ResponseArray:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          description: State code of response
 *        message:
 *          type: string
 *          description: Message of the response
 *        data:
 *          type: array
 *          description: Persons
 *      required:
 *         - status
 *         - message
 *         - data
 *      example:
 *        status: OK
 *        message: All persons were found
 *        data: [{"personId": "5d47f907-acd3-49f4-b003-22c755e828f1","name": "Pablo actualizado","lastname": "Hernandez","idType": "DNI","idNumber": 876764536,"cityOfBirth": "Lima","age": 38}]
 *    ResponseObject:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          description: State code of response
 *        message:
 *          type: string
 *          description: Message of the response
 *        data:
 *          type: object
 *          description: Person
 *      required:
 *         - status
 *         - message
 *         - data
 *      example:
 *        status: OK
 *        message: The person was found
 *        data: {"personId": "5d47f907-acd3-49f4-b003-22c755e828f1","name": "Pablo actualizado","lastname": "Hernandez","idType": "DNI","idNumber": 876764536,"cityOfBirth": "Lima","age": 38}      
 *    Person:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Name of the new person
 *        lastname:
 *          type: string
 *          description: Lastname of the new person
 *        idType:
 *          type: string
 *          description: The idType of the new person
 *        idNumber:
 *          type: integer
 *          description: The idNumber of the new person
 *        cityOfBirth:
 *          type: string
 *          description: City of birth of the new person
 *        age:
 *          type: string
 *          description: Age of the new person
 *      required:
 *         - name
 *         - lastname
 *         - idType
 *         - idNumber
 *         - cityOfBirth
 *         - age
 *      example:
 *        name: Josué
 *        lastname: Medina García
 *        idType: DNI
 *        idNumber: 67492874
 *        cityOfBirth: Perú
 *        age: 21
 *  parameters:
 *    idType:
 *      in: path
 *      name: idType
 *      required: true
 *      schema:
 *        type: string
 *      description: This is the idType of a person
 *    idNumber:
 *      in: path
 *      name: idNumber
 *      required: true
 *      schema:
 *        type: integer
 *      description: This is the idNumber of a person
 *    ageNumber:
 *      in: path
 *      name: ageNumber
 *      required: true
 *      schema:
 *        type: integer
 *      description: This is the ageNumber of a person
 */

/**
 * @swagger
 * /api/v1/persons:
 *  get:
 *    summary: Get all persons
 *    responses:
 *      200:
 *        description: The list of persons saved in MySQL
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseArray'
 */
personRouter.get('/', getAllPersons)

/**
 * @swagger
 * /api/v1/persons/age/{ageNumber}:
 *  get:
 *    summary: Get a list of persons that are greater or equal to a age number
 *    parameters:
 *      - $ref: '#/components/parameters/ageNumber'
 *    responses:
 *      201:
 *        description: Person create
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseArray'
 */
personRouter.get('/age/:ageNumber', getPersonsThatAge)

/**
 * @swagger
 * /api/v1/persons/{idType}/{idNumber}:
 *  get:
 *    summary: Get a person with idType and idNumber
 *    parameters: 
 *      - $ref: '#components/parameters/idType'
 *      - $ref: '#components/parameters/idNumber'
 *    responses:
 *      200:
 *        description: Get a person that match with idType and idNumber in the params
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseObject'
 *              
 */
personRouter.get('/:idType/:idNumber', getUniquePerson)

/**
 * @swagger
 * /api/v1/persons:
 *  post:
 *    summary: Create a new person
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Person'
 *    responses:
 *      201:
 *        description: Person create
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseObject'
 */
personRouter.post('/', createPerson)

/**
 * @swagger
 * /api/v1/persons/{idType}/{idNumber}:
 *  put:
 *    summary: Update info of a person sending idType and idNumber
 *    parameters: 
 *      - $ref: '#components/parameters/idType'
 *      - $ref: '#components/parameters/idNumber'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Name of the person
 *              lastname:
 *                type: string
 *                description: Lastname of the person
 *              cityOfBirth:
 *                type: string
 *                description: City of birth of the person
 *              age:
 *                type: integer
 *                description: Age of the person
 *            required:
 *              - name
 *              - lastname
 *              - cityOfBirth
 *              - age
 *            example:
 *              name: Josué actualizado
 *              lastname: Medina actualizado
 *              cityOfBirth: Perú
 *              age: 21
 *    responses:
 *      200:
 *        description: Update a person that match with idType and idNumber in the params
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: State code of response
 *                message:
 *                  type: string
 *                  description: Message of the respons
 *                data:
 *                  type: object
 *                  description: City of birth of the new person
 *              required:
 *                - status
 *                - message
 *                - data
 *              example:
 *                status: OK
 *                message: The person was updated
 *                data: {}
 */
personRouter.put('/:idType/:idNumber', updatePerson)

/**
 * @swagger
 * /api/v1/persons/{idType}/{idNumber}:
 *  delete:
 *    summary: Delete a person sending idType and idNumber
 *    parameters: 
 *      - $ref: '#components/parameters/idType'
 *      - $ref: '#components/parameters/idNumber'
 *    responses:
 *      200:
 *        description: Delete a person that match with idType and idNumber in the params
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: State code of response
 *                message:
 *                  type: string
 *                  description: Message of the response
 *                data:
 *                  type: object
 *                  description: Empty data
 *              required:
 *                - status
 *                - message
 *                - data
 *              example:
 *                status: OK
 *                message: The person was deleted
 *                data: {}
 */
personRouter.delete('/:idType/:idNumber', deletePersonByIdTypeAndNumber)

export default personRouter
