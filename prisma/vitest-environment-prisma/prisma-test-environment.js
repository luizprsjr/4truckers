/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config')

const crypto = require('crypto')
const { execSync } = require('child_process')
const { PrismaClient } = require('@prisma/client')

const randomUUID = crypto.randomUUID
const prisma = new PrismaClient()

function generateDatabaseURL(schema) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

module.exports = {
  transformMode: 'ssr',
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
