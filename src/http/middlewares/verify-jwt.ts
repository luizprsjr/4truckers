import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    if (error instanceof Error && error.message) {
      return reply.status(401).send({ message: error.message })
    }

    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
