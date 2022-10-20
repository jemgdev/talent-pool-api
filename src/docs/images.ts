import { idNumber, idType } from './persons'

// Params

const imageId = {
  name: 'imageId',
  in: 'path',
  required: true,
  schema: {
    type: 'string'
  },
  description: 'This is the imageId of an image',
  example: '1e4fab41-3d27-4e3c-ace0-e53dcdb958e2'
}

// Endpoints

const getAllImages = {
  tags: ['Images'],
  description: 'Get a list of persons that are greater or equal to a age number',
  responses: {
    '200': {
      description: 'The list of persons saved in MySQL',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponseImageArray'
          }
        }
      }
    }
  }
}

const getAnImageById = {
  tags: ['Images'],
  description: 'Get an image',
  parameters: [
    imageId
  ],
  responses: {
    '200': {
      description: 'The list of persons saved in MySQL',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponseImageObject'
          }
        }
      }
    }
  }
}

const getImagesFromPerson = {
  tags: ['Images'],
  description: 'Get an image',
  parameters: [
    idType,
    idNumber
  ],
  responses: {
    '200': {
      description: 'The list of persons saved in MySQL',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                description: 'State code of image',
                example: 'OK',
                required: true
              },
              message: {
                type: 'string',
                description: 'Message of the response',
                example: 'The images were found',
                required: true
              },
              data: {
                type: 'array',
                description: 'Array of images',
                example: {
                  _id: '634f037908ecd03c1f83cef1',
                  imageId: '48508e9d-ec6c-4613-a671-f8e68d4d8104',
                  url: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/e0693281-5006-4b24-98ed-4334ab91bf49.png',
                  title: 'Titulo para typescript',
                  description: 'description actualizada 1'
                },
                required: true
              },
            }
          }
        }
      }
    }
  }
}

const createImage = {
  tags: ['Images'],
  description: 'Create an image',
  parameters: [
    idType,
    idNumber
  ],
  requestBody: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            image: {
              type: 'file',
              description: 'Image path',
            },
            title: {
              type: 'string',
              description: 'Title of the image'
            },
            description: {
              type: 'string',
              description: 'Description of the image'
            }
          }
        }
      }
    }
  },
  responses: {
    '200': {
      description: 'The list of persons saved in MySQL',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                description: 'State code of image',
                example: 'OK',
                required: true
              },
              message: {
                type: 'string',
                description: 'Message od the response',
                example: 'The images was uploaded',
                required: true
              },
              data: {
                type: 'object',
                description: 'Object of an image',
                properties: {
                  imageId: {
                    type: 'string',
                    description: 'Id of an image',
                    example: '1e4fab41-3d27-4e3c-ace0-e53dcdb958e2'
                  },
                  url: {
                    type: 'string',
                    description: 'A image url',
                    example: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/d1dfa9d0-c89b-4677-ad0a-717973e885f4.jpg'
                  },
                  title: {
                    type: 'string',
                    description: 'An image title',
                    example: 'Test image',
                  },
                  description: {
                    type: 'string',
                    description: 'An image description',
                    example: 'Description test'
                  }
                },
                example: {
                  imageId: '1e4fab41-3d27-4e3c-ace0-e53dcdb958e2',
                  url: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/d1dfa9d0-c89b-4677-ad0a-717973e885f4.jpg',
                  title: 'Imagen de prueba',
                  description: 'Descipcion de prueba'
                },
                required: true
              },
            }
          }
        }
      }
    }
  }
}

const updateImage = {
  tags: ['Images'],
  description: 'Update an image',
  parameters: [
    imageId
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the image',
              example: 'Title of my image'
            },
            description: {
              type: 'string',
              description: 'Description of the image',
              example: 'Description of my image'
            }
          }
        }
      }
    }
  },
  responses: {
    '200': {
      description: 'The list of persons saved in MySQL',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                description: 'State code of image',
                example: 'OK',
                required: true
              },
              message: {
                type: 'string',
                description: 'Message od the response',
                example: 'The images was updated',
                required: true
              },
              data: {
                type: 'object',
                description: 'Object of an image',
                properties: {
                  imageId: {
                    type: 'string',
                    description: 'Id of an image',
                    example: '1e4fab41-3d27-4e3c-ace0-e53dcdb958e2'
                  },
                  url: {
                    type: 'string',
                    description: 'A image url',
                    example: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/d1dfa9d0-c89b-4677-ad0a-717973e885f4.jpg'
                  },
                  title: {
                    type: 'string',
                    description: 'An image title',
                    example: 'Test image',
                  },
                  description: {
                    type: 'string',
                    description: 'An image description',
                    example: 'Description test'
                  }
                },
                example: {
                  imageId: '1e4fab41-3d27-4e3c-ace0-e53dcdb958e2',
                  url: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/d1dfa9d0-c89b-4677-ad0a-717973e885f4.jpg',
                  title: 'Imagen de prueba',
                  description: 'Descipcion de prueba'
                },
                required: true
              },
            }
          }
        }
      }
    }
  }
}

const deleteImage = {
  tags: ['Images'],
  description: 'Delete an image',
  parameters: [
    imageId
  ],
  responses: {
    '200': {
      description: 'The list of persons saved in MySQL',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                description: 'State code of image',
                example: 'OK',
                required: true
              },
              message: {
                type: 'string',
                description: 'Message od the response',
                example: 'The images was deleted',
                required: true
              },
              data: {
                type: 'object',
                description: 'Object of an image',
                properties: {
                  imageId: {
                    type: 'string',
                    description: 'Id of an image',
                    example: '1e4fab41-3d27-4e3c-ace0-e53dcdb958e2'
                  },
                  url: {
                    type: 'string',
                    description: 'A image url',
                    example: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/d1dfa9d0-c89b-4677-ad0a-717973e885f4.jpg'
                  },
                  title: {
                    type: 'string',
                    description: 'An image title',
                    example: 'Test image',
                  },
                  description: {
                    type: 'string',
                    description: 'An image description',
                    example: 'Description test'
                  }
                },
                example: {
                  imageId: '1e4fab41-3d27-4e3c-ace0-e53dcdb958e2',
                  url: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/d1dfa9d0-c89b-4677-ad0a-717973e885f4.jpg',
                  title: 'Imagen de prueba',
                  description: 'Descipcion de prueba'
                },
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

const ResponseImageArray = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      description: 'State code of image',
      example: 'OK',
      required: true
    },
    message: {
      type: 'string',
      description: 'Message of the response',
      example: 'The images were found',
      required: true
    },
    data: {
      type: 'array',
      description: 'Array of images',
      example: [
        {
          _id: '634f037908ecd03c1f83cef1',
          imageId: '48508e9d-ec6c-4613-a671-f8e68d4d8104',
          url: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/e0693281-5006-4b24-98ed-4334ab91bf49.png',
          title: 'Titulo para typescript',
          description: 'description actualizada 1'
        }
      ],
      required: true
    },
  }
}

const ResponseImageObject = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      description: 'State code of image',
      example: 'OK',
      required: true
    },
    message: {
      type: 'string',
      description: 'Message od the response',
      example: 'The images was found',
      required: true
    },
    data: {
      type: 'object',
      description: 'Object of an image',
      properties: {
        imageId: {
          type: 'string',
          description: 'Id of an image',
          example: '1e4fab41-3d27-4e3c-ace0-e53dcdb958e2'
        },
        person: {
          type: 'object',
          description: 'The image owner',
          example: {
            name: 'TypeScripadasdt',
            lastname: 'Hernandez',
            idType: 'CC',
            idNumber: 335762216,
            cityOfBirth: 'EEUU',
            age: 18
          }
        },
        url: {
          type: 'string',
          description: 'A image url',
          example: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/d1dfa9d0-c89b-4677-ad0a-717973e885f4.jpg'
        },
        title: {
          type: 'string',
          description: 'An image title',
          example: 'Test image',
        },
        description: {
          type: 'string',
          description: 'An image description',
          example: 'Description test'
        }
      },
      example: {
        imageId: '1e4fab41-3d27-4e3c-ace0-e53dcdb958e2',
        person: {
          name: 'TypeScripadasdt',
          lastname: 'Hernandez',
          idType: 'CC',
          idNumber: 335762216,
          cityOfBirth: 'EEUU',
          age: 18
        },
        url: 'https://talent-pool-images.s3.us-west-2.amazonaws.com/d1dfa9d0-c89b-4677-ad0a-717973e885f4.jpg',
        title: 'Imagen de prueba',
        description: 'Descipcion de prueba'
      },
      required: true
    },
  }
}

export { getAllImages, getAnImageById, getImagesFromPerson, createImage, updateImage, deleteImage, ResponseImageArray, ResponseImageObject }