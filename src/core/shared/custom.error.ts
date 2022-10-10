export default class CustomError extends Error {
  name: string
  code: string

  constructor (code: string, name: string, message: string) {
    super(message)
    this.name = name
    this.code = code
  }
}