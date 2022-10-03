const ERROR_HANDLERS = {
  defaultError: error => console.error(error.message)
}

const errorHandler = (error, request, response, next) => {
  console.error(error.name)
  console.error(error)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
}

export default errorHandler
