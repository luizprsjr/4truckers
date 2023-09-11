import dayjs from 'dayjs'

import { prisma } from '@/lib/prisma'
import { RefreshTokenRepository } from '@/repositories/refresh-token-repository'
import { RefreshToken } from '@prisma/client'

interface RefreshTokenUseCaseRequest {
  oldRefreshToken: string
}

interface RefreshTokenUseCaseResponse {
  refreshToken: RefreshToken
}

export class RefreshTokenUseCase {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute({
    oldRefreshToken,
  }: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
    const oldToken =
      await this.refreshTokenRepository.findFirst(oldRefreshToken)

    if (!oldToken) {
      throw new Error('Authorization token expired.')
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(oldToken.expiresIn))

    if (!refreshTokenExpired) {
      const expiresIn = dayjs().add(7, 'day').unix()

      const refreshToken = await this.refreshTokenRepository.create({
        userId: oldToken.userId,
        expiresIn,
      })

      const now = dayjs().unix()
      await prisma.refreshToken.deleteMany({
        where: {
          OR: [
            {
              expiresIn: {
                lt: now,
              },
            },
            {
              id: oldToken.id,
            },
          ],
        },
      })

      return { refreshToken }
    } else {
      throw new Error('Authorization token expired.')
    }
  }
}
