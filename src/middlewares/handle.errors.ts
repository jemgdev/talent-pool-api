import { Response } from 'express'

const ERROR_HANDLERS = {
  Error: (response: Response, error: any) => response.status(400).json({ errorCode: error.code, message: error.message }).end(),
  TypeError: (response: Response, error: any) => response.status(400).json({ errorCode: error.code, message: error.message }).end(),
  PrismaClientInitializationError: (response: Response, error: any) => response.status(500).json({ errorCode: error.code, message: error.message }).end(),
  Image: (response: Response, error: any) => response.status(404).json({ errorCode: error.code, message: error.message, data: {} }).end(),
  TALENT_POOL_API_PERSON_NOT_FOUND: (response: Response, error: any) => response.status(404).json({ errorCode: error.name, message: error.message, data: {} }).end(),
  TALENT_POOL_API_PERSON_EXIST: (response: Response, error: any) => response.status(403).json({ errorCode: error.name, message: error.message, data: {} }).end(),
  TALENT_POOL_API_PERSON: (response: Response, error: any) => response.status(400).json({ errorCode: error.name, message: error.message, data: {} }).end(),
  TALENT_POOL_API_IMAGE: (response: Response, error: any) => response.status(404).json({ errorCode: error.name, message: error.message, data: {} }).end(),
  defaultError: (response: Response, error: any) => response.status(500).json({ errorCode: error.code, message: 'Internal server error', data: {} }).end(),
}

const handleErrors = (error, request, response: Response, next) => {
  console.error(error.code)
  console.error(error)
  const handler = ERROR_HANDLERS[error.code] || ERROR_HANDLERS.defaultError
  handler(response, error)
}

export default handleErrors
