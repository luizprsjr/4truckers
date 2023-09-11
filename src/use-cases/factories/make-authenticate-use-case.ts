import { PrismaRefreshTokenRepository } from '@/repositories/prisma/prisma-refresh-token'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const refreshTokenRepository = new PrismaRefreshTokenRepository()
  const authenticateUseCase = new AuthenticateUseCase(
    usersRepository,
    refreshTokenRepository,
  )

  return authenticateUseCase
}
