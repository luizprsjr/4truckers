import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { fetchAll } from './fetch-all'

export async function announcementsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/announcements', create)
  app.get('/announcements', fetchAll)
}
