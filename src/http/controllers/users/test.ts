import { FastifyReply, FastifyRequest } from 'fastify'

export async function testando(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ message: 'test' })
}
