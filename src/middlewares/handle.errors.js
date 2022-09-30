const ERROR_HANDLERS = {
  defaultError: response => response.status(500).end()
}

const handleErrors = (error, request, response, next) => {
  console.error(error.name)
  console.log(error)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
}

export default handleErrors
