import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { RefreshTokenRepository } from '../refresh-token-repository'

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  async create(data: Prisma.RefreshTokenUncheckedCreateInput) {
    const refreshToken = await prisma.refreshToken.create({
      data: {
        userId: data.userId,
        expiresIn: data.expiresIn,
      },
    })

    return refreshToken
  }

  async findFirst(refreshToken: string) {
    const token = await prisma.refreshToken.findFirst({
      where: { id: refreshToken },
    })

    return token
  }
}
