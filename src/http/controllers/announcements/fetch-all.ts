import { FastifyReply, FastifyRequest } from 'fastify'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeFetchAnnouncementsUseCase } from '@/use-cases/factories/make-fetch-announcements'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchAnnouncementsUseCase = makeFetchAnnouncementsUseCase()

    const { announcements } = await fetchAnnouncementsUseCase.execute()

    return reply.status(201).send(announcements)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
