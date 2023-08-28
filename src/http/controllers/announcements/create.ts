import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeAddAnnouncementUseCase } from '@/use-cases/factories/make-add-announcement-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAnnouncementBodySchema = z.object({
    userId: z.string(),
    description: z.string().optional(),
    weight: z.number().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    canStack: z.boolean().optional(),
    departure: z.string().transform((str) => new Date(str)),
    departureCity: z.string(),
    arrival: z.date().optional(),
    arrivalCity: z.string(),
  })

  const {
    description,
    weight,
    length,
    width,
    height,
    canStack,
    departure,
    departureCity,
    arrival,
    arrivalCity,
  } = createAnnouncementBodySchema.parse(request.body)

  try {
    const addAnnouncementUseCase = makeAddAnnouncementUseCase()

    await addAnnouncementUseCase.execute({
      userId: request.user.sub,
      description,
      weight,
      length,
      width,
      height,
      canStack,
      departure,
      departureCity,
      arrival,
      arrivalCity,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
