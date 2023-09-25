import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRefreshTokenUseCase } from '@/use-cases/factories/make-refresh-token'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  const refreshBodySchema = z.object({
    oldRefreshToken: z.string(),
  })

  try {
    const { oldRefreshToken } = refreshBodySchema.parse(request.body)

    const refreshTokenUseCase = makeRefreshTokenUseCase()
    const { refreshToken } = await refreshTokenUseCase.execute({
      oldRefreshToken,
    })

    if (refreshToken) {
      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: refreshToken.userId,
            expiresIn: '15m',
          },
        },
      )

      return reply.status(200).send({
        refreshToken: refreshToken.id,
        token,
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(401).send({ message: 'Refresh Token Expired.' })
    }
  }
}
