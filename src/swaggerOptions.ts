const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Talent Pool API',
      version: '1.0.0',
      description: 'An API that provide CRUD from person and image entities'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
}

export default options