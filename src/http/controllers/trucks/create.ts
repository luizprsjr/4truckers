import { FastifyReply, FastifyRequest } from 'fastify'
import { relative } from 'path'
import { z } from 'zod'

import { UnauthorizedTruckerAccessError } from '@/use-cases/errors/unauthorized-trucker-access-error'
import { UserAlreadyHaveATruck } from '@/use-cases/errors/user-already-have-a-truck'
import { makeAddTruckUseCase } from '@/use-cases/factories/make-add-truck-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAnnouncementBodySchema = z.object({
    truckModel: z.string(),
    capacity: z.number(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })

  const { truckModel, capacity, length, width, height } =
    createAnnouncementBodySchema.parse(request.body)

  try {
    const addTruckUseCase = makeAddTruckUseCase()

    const truck = await addTruckUseCase.execute({
      userId: request.user.sub,
      truckModel,
      capacity,
      length,
      width,
      height,
    })

    return reply.status(201).send(truck)
  } catch (error) {
    if (error instanceof UnauthorizedTruckerAccessError) {
      return reply.status(401).send({ message: error.message })
    }

    if (error instanceof UserAlreadyHaveATruck) {
      throw reply.status(403).send({ message: error.message })
    }

    throw error
  }
}
