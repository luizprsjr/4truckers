import { FastifyReply, FastifyRequest } from 'fastify'

import { makeSearchAnnouncementUseCase } from '@/use-cases/factories/make-search-announcement-use-case'

export async function searchAnnouncement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { query } = request.query

  console.log(query)

  const searchAnnouncementUseCase = makeSearchAnnouncementUseCase()

  const announcements = await searchAnnouncementUseCase.execute({ query })

  // TODO: change this

  // if (announcement.user) {
  //   delete (announcement.user as { passwordHash?: string }).passwordHash
  // }

  return reply.status(200).send(announcements)
}
