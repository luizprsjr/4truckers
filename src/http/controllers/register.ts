import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { RegisterUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const phoneRegex =
    /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().regex(phoneRegex, 'Invalid Number!'),
  })

  const { name, email, password, phone } = registerBodySchema.parse(
    request.body,
  )

  try {
    await RegisterUseCase({
      name,
      email,
      password,
      phone,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
