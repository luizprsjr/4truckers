import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGoogleAuthenticateUseCase } from '@/use-cases/factories/make-google-authenticate-use-case'

export async function googleAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const googleAuthenticateBodySchema = z.object({
    accessToken: z.string(),
  })

  const { accessToken } = googleAuthenticateBodySchema.parse(request.body)

  try {
    const googleAuthenticateUseCase = makeGoogleAuthenticateUseCase()

    const { user, refreshToken } = await googleAuthenticateUseCase.execute({
      accessToken,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '15m',
        },
      },
    )

    return reply.status(200).send({
      token,
      refreshToken: refreshToken.id,
      user: {
        ...user,
        passwordHash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
