import { Prisma, RefreshToken } from '@prisma/client'

export interface RefreshTokenRepository {
  create(data: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken>
  findFirst(refreshToken: string): Promise<RefreshToken | null>
}
