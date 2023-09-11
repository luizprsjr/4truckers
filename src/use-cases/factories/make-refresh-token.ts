import { PrismaRefreshTokenRepository } from '@/repositories/prisma/prisma-refresh-token'

import { RefreshTokenUseCase } from '../refresh-token'

export function makeRefreshTokenUseCase() {
  const refreshTokenRepository = new PrismaRefreshTokenRepository()
  const refreshTokenUseCase = new RefreshTokenUseCase(refreshTokenRepository)

  return refreshTokenUseCase
}
