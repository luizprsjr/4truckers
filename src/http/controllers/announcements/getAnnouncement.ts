import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetAnnouncementUseCase } from '@/use-cases/factories/make-get-announcement-use-case'

export async function getAnnouncement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string }

  const getAnnouncementUseCase = makeGetAnnouncementUseCase()

  const { announcement } = await getAnnouncementUseCase.execute({ id })

  if (announcement.user) {
    delete (announcement.user as { passwordHash?: string }).passwordHash
  }

  return reply.status(200).send(announcement)
}
