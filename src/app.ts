import fastify from 'fastify'
import { ZodError } from 'zod'

import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'

import { env } from './env'
import { announcementsRoutes } from './http/controllers/announcements/routes'
import { trucksRoutes } from './http/controllers/trucks/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(cors, {
  origin: true,
  credentials: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '15m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(trucksRoutes)
app.register(announcementsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
