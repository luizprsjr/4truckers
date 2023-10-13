import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case'
import { zodErrorHandler } from '@/utils/zodErrorHandler'

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const phoneRegex =
    /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/

  const registerBodySchema = z.object({
    name: z.string().optional(),
    phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number.'),
    type: z.enum(['USER', 'TRUCKER']).optional(),
  })

  try {
    const { name, phoneNumber, type } = registerBodySchema.parse(request.body)

    console.log('aqui')

    const updateUserUseCase = makeUpdateUserUseCase()

    const user = await updateUserUseCase.execute({
      id: request.user.sub,
      name,
      phoneNumber,
      type,
    })

    return reply.status(200).send(user)
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: zodErrorHandler(error) })
    }

    throw error
  }
}
