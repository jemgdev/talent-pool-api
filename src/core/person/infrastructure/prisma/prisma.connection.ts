import { PrismaClient } from '@prisma/client'

let mysqlConnectionString = ''

if (process.env.NODE_ENV === 'test') {
  mysqlConnectionString = process.env.DATABASE_URL_TEST ?? ''
} else if (process.env.ENV === 'dev') {
  mysqlConnectionString = process.env.DATABASE_URL ?? ''
}

const prisma = new PrismaClient({
  datasources: { db: { url: mysqlConnectionString } }
})

prisma.$connect()
  .then(() => console.log(`Prisma DB ${process.env.NODE_ENV} is connected`))
  .catch(error => console.log(error))

export default prisma
