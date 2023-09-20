import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { NoTruckError } from '@/use-cases/errors/no-truck-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeAddAnnouncementUseCase } from '@/use-cases/factories/make-add-announcement-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAnnouncementBodySchema = z.object({
    originCity: z.string(),
    originDate: z.string().transform((str) => new Date(str)),
    originEndDate: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    destinationCity: z.string(),
    destinationDate: z
      .string()
      .transform((str) => new Date(str))
      .optional(),

    weight: z.number().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    canStack: z.boolean().optional(),
    description: z.string().optional(),
  })

  const {
    originCity,
    originDate,
    originEndDate,
    destinationCity,
    destinationDate,
    weight,
    length,
    width,
    height,
    canStack,
    description,
  } = createAnnouncementBodySchema.parse(request.body)

  try {
    const addAnnouncementUseCase = makeAddAnnouncementUseCase()

    await addAnnouncementUseCase.execute({
      userId: request.user.sub,
      originCity,
      originDate,
      originEndDate,
      destinationCity,
      destinationDate,
      weight,
      length,
      width,
      height,
      canStack,
      description,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof NoTruckError) {
      // TODO: you should habe a truck
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
