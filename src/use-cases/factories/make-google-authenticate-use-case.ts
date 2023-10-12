import { PrismaRefreshTokenRepository } from '@/repositories/prisma/prisma-refresh-token'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { GoogleAuthenticateUseCase } from '../google-authenticate'

export function makeGoogleAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const refreshTokenRepository = new PrismaRefreshTokenRepository()
  const googleAuthenticateUseCase = new GoogleAuthenticateUseCase(
    usersRepository,
    refreshTokenRepository,
  )

  return googleAuthenticateUseCase
}
