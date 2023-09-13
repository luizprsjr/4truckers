import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'

export async function trucksRoutes(app: FastifyInstance) {
  app.post('/trucks', { onRequest: [verifyJWT] }, create)
}
