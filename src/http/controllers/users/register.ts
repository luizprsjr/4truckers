import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { zodErrorHandler } from '@/utils/zodErrorHandler'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const phoneRegex =
    /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/

  const registerBodySchema = z
    .object({
      name: z.string().min(3, 'The name needs to have as least 3 characters.'),
      email: z.string().email('Provide a valid email.'),
      password: z
        .string()
        .min(6, 'The password needs to have at least 6 characters.'),
      confirmPassword: z.string(),
      phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number.'),
      type: z.enum(['USER', 'TRUCKER']).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password does not match.',
      path: ['confirmPassword'],
    })

  try {
    const { name, email, password, phoneNumber, type } =
      registerBodySchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      phoneNumber,
      type,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({ message: zodErrorHandler(error) })
    }

    throw error
  }

  return reply.status(201).send()
}
