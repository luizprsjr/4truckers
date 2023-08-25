import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const phoneRegex = new RegExp(
      /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
    );
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      phone: z.string().regex(phoneRegex, 'Invalid Number!'),
    })
  
    const {name, email, password, phone} = registerBodySchema.parse(request.body)
  
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password,
        phoneNumber: phone
      }
    })
  
    return reply.status(201).send()
}