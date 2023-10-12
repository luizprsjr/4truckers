import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { fetchAll } from './fetch-all'
import { getAnnouncement } from './getAnnouncement'
import { searchAnnouncement } from './searchAnnouncement'

export async function announcementsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/announcements', create)
  app.get('/announcements', fetchAll)
  app.get('/announcements/:id', getAnnouncement)
  app.get('/search-announcements', searchAnnouncement)
}
