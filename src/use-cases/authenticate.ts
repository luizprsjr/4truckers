import { compare } from 'bcryptjs'
import dayjs from 'dayjs'

import { RefreshTokenRepository } from '@/repositories/refresh-token-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { RefreshToken, User } from '@prisma/client'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
  refreshToken: RefreshToken
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.passwordHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const expiresIn = dayjs().add(7, 'day').unix()

    const refreshToken = await this.refreshTokenRepository.create({
      userId: user.id,
      expiresIn,
    })

    return { user, refreshToken }
  }
}
