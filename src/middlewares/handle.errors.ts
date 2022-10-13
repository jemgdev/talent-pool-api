import { NextFunction, Request, Response } from 'express'

const ERROR_HANDLERS = {
  PERSON_404: (response: Response, error: any) => response.status(404).json({ errorCode: error.name, message: error.message, data: {} }).end(),
  PERSON_403: (response: Response, error: any) => response.status(403).json({ errorCode: error.name, message: error.message, data: {} }).end(),
  PERSON_400: (response: Response, error: any) => response.status(400).json({ errorCode: error.name, message: error.message, data: {} }).end(),
  IMAGE_404: (response: Response, error: any) => response.status(404).json({ errorCode: error.name, message: error.message, data: {} }).end(),
  defaultError: (response: Response, error: any) => response.status(500).json({ errorCode: error.code, message: 'Internal server error', data: {} }).end(),
}

const handleErrors = (error, request: Request, response: Response, next: NextFunction): void => {
  console.error(error.code)
  console.error(error)
  const handler = ERROR_HANDLERS[error.code] || ERROR_HANDLERS.defaultError
  handler(response, error)
}

export default handleErrors
