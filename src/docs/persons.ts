// Params

const idType = {
  name: 'idType',
  in: 'path',
  required: true,
  schema: {
    type: 'string'
  },
  description: 'This is the idType of a person',
  example: 'DNI'
}

const idNumber = {
  name: 'idNumber',
  in: 'path',
  required: true,
  schema: {
    type: 'number'
  },
  description: 'This is the idNumber of a person',
  example: 876764536
}

const ageNumber = {
  name: 'ageNumber',
  in: 'path',
  required: true,
  schema: {
    type: 'integer'
  },
  description: 'This is the age number od a person',
  example: 15
}

// Endpoints

const getAllPersonsAge = {
  tags: ['Persons'],
  description: 'Get a list of persons that are greater or equal to a age number',
  parameters: [
    ageNumber
  ],
  responses: {
    '200': {
      description: 'The list of persons saved in MySQL',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponsePersonArray'
          }
        }
      }
    }
  }
}

const getAllPersons = {
  tags: ['Persons'],
  description: 'Get all persons',
  responses: {
    '200': {
      description: 'The list of persons saved in MySQL',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponsePersonArray'
          }
        }
      }
    }
  }
}

const getUniquePerson = {
  tags: ['Persons'],
  description: 'Get a person with idType and idNumber',
  parameters: [
    idType,
    idNumber
  ],
  responses: {
    '200': {
      description: 'Get a person that match with idType and idNumber in the params',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponsePersonObject'
          }
        }
      }
    }
  }
}

const createPerson = {
  tags: ['Persons'],
  description: 'Get a person with idType and idNumber',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the new person',
              required: true,
              example: 'Gean Pieer'
            },
            lastname: {
              type: 'string',
              description: 'Lastname of the new person',
              required: true,
              example: 'López Zevallos'
            },
            idType: {
              type: 'string',
              description: 'Id type of the new person',
              required: true,
              example: 'DNI'
            },
            idNumber: {
              type: 'integer',
              description: 'Id number of the new person',
              required: true,
              example: 876764536
            },
            cityOfBirth: {
              type: 'string',
              description: 'City of birth of the new person',
              required: true,
              example: 'Perú'
            },
            age: {
              type: 'number',
              description: 'Age of the new person',
              required: true,
              example: '10'
            },
          }
        }
      }
    }
  },
  responses: {
    '201': {
      description: 'Get a person that match with idType and idNumber in the params',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponsePersonObject'
          }
        }
      }
    }
  }
}

const updatePerson = {
  tags: ['Persons'],
  description: 'Update info of a person sending idType and idNumber',
  parameters: [
    idType,
    idNumber
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the new person',
              required: true,
              example: 'Gean Pieer'
            },
            lastname: {
              type: 'string',
              description: 'Lastname of the new person',
              required: true,
              example: 'López Zevallos'
            },
            cityOfBirth: {
              type: 'string',
              description: 'City of birth of the new person',
              required: true,
              example: 'Perú'
            },
            age: {
              type: 'number',
              description: 'Age of the new person',
              required: true,
              example: '10'
            },
          }
        }
      }
    }
  },
  responses: {
    '200': {
      description: 'Update a person that match with idType and idNumber in the params',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                description: 'State code of the response',
                example: 'OK',
                required: true
              },
              message: {
                type: 'string',
                description: 'Message of the response',
                example: 'The person was updated',
                required: true
              },
              data: {
                type: 'object',
                description: 'Object empty',
                example: {},
                required: true
              },
            }
          }
        }
      }
    }
  }
}

const deletePerson = {
  tags: ['Persons'],
  description: 'Update info of a person sending idType and idNumber',
  parameters: [
    idType,
    idNumber
  ],
  responses: {
    '200': {
      description: 'Update a person that match with idType and idNumber in the params',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                description: 'State code of the response',
                example: 'OK',
                required: true
              },
              message: {
                type: 'string',
                description: 'Message of the response',
                example: 'The person was deleted',
                required: true
              },
              data: {
                type: 'object',
                description: 'Object empty',
                example: {},
                required: true
              },
            }
          }
        }
      }
    }
  }
}

// Schemas

const ResponsePersonArray = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      description: 'State code of response',
      example: 'OK',
      required: true
    },
    message: {
      type: 'string',
      description: 'Message code of response',
      example: 'All persons were found',
      required: true
    },
    data: {
      type: 'array',
      description: 'Array of persons',
      example: [
        {
          personId: '5d47f907-acd3-49f4-b003-22c755e828f1',
          name: 'Pablo actualizado',
          lastname: 'Hernandez',
          idType: 'DNI',
          idNumber: 876764536,
          cityOfBirth: 'Lima',
          age: 38
        }
      ],
      required: true
    },
  }
}

const ResponsePersonObject = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      description: 'State code of the response',
      example: 'OK',
      required: true
    },
    message: {
      type: 'string',
      description: 'Message of the response',
      example: 'All persons were found',
      required: true
    },
    data: {
      type: 'object',
      description: 'The person was found',
      example: {
        personId: '5d47f907-acd3-49f4-b003-22c755e828f1',
        name: 'Pablo actualizado',
        lastname: 'Hernandez',
        idType: 'DNI',
        idNumber: 876764536,
        cityOfBirth: 'Lima',
        age: 38
      },
      required: true
    },
  }
}

const ResponsePerson = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Name of the new person',
      required: true,
      example: 'Josué'
    },
    lastname: {
      type: 'string',
      description: 'Lastname of the new person',
      required: true,
      example: 'Medina García'
    },
    idType: {
      type: 'string',
      description: 'The idType of the new person',
      required: true,
      example: 'DNI'
    },
    idNumber: {
      type: 'integer',
      description: 'The idNumber of the new person',
      required: true,
      example: '67492874'
    },
    cityOfBirth: {
      type: 'string',
      description: 'City of birth of the new person',
      required: true,
      example: 'Perú'
    },
    age: {
      type: 'number',
      description: 'Age of the new person',
      required: true,
      example: '21'
    },
  }
}

export { getAllPersons, getAllPersonsAge, getUniquePerson, createPerson, updatePerson, deletePerson, ageNumber, ResponsePersonArray, ResponsePersonObject, ResponsePerson, idType, idNumber }