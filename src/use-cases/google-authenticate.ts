import axios from 'axios'
import dayjs from 'dayjs'

import { RefreshTokenRepository } from '@/repositories/refresh-token-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { RefreshToken, User } from '@prisma/client'

interface GoogleOAuthResponse {
  email: string
  family_name: string
  given_name: string
  id: string
  locale: string
  name: string
  picture: string
  verified_email: boolean
}

interface GoogleAuthenticateUseCaseRequest {
  accessToken: string
}

interface GoogleAuthenticateUseCaseResponse {
  user: User
  refreshToken: RefreshToken
}

export class GoogleAuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute({
    accessToken,
  }: GoogleAuthenticateUseCaseRequest): Promise<GoogleAuthenticateUseCaseResponse> {
    const { data } = await axios.get<GoogleOAuthResponse>(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
    )

    const userAlreadyExists = await this.usersRepository.findByGoogleId(data.id)

    const expiresIn = dayjs().add(7, 'day').unix()

    if (userAlreadyExists) {
      const refreshToken = await this.refreshTokenRepository.create({
        userId: userAlreadyExists.id,
        expiresIn,
      })

      return { user: userAlreadyExists, refreshToken }
    }

    const user = await this.usersRepository.create({
      googleId: data.id,
      name: `${data.given_name} ${data.family_name}`,
      email: data.email,
      avatarUrl: data.picture,
    })

    const refreshToken = await this.refreshTokenRepository.create({
      userId: user.id,
      expiresIn,
    })

    return { user, refreshToken }
  }
}
