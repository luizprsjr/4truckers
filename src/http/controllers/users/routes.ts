import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { authenticate } from './authenticate'
import { googleAuthenticate } from './google-authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'
import { save } from './save'
import { testando } from './test'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/test', testando)
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/google-session', googleAuthenticate)

  app.patch('/token/refresh', refresh)
  /** Authenticated */

  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.put('/users', { onRequest: [verifyJWT] }, save)
}
