import { randomUUID } from 'node:crypto'

import { Prisma, RefreshToken } from '@prisma/client'

import { RefreshTokenRepository } from '../refresh-token-repository'

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  public items: RefreshToken[] = []

  async create(data: Prisma.RefreshTokenUncheckedCreateInput) {
    const refreshToken = {
      id: data.id ?? randomUUID(),
      expiresIn: data.expiresIn,
      userId: data.userId,
    }

    this.items.push(refreshToken)

    return refreshToken
  }

  async findFirst(refreshToken: string) {
    const token = this.items.find((item) => item.id === refreshToken)

    if (!token) {
      return null
    }

    return token
  }
}
