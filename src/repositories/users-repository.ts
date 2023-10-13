import { Prisma, User as PrismaUser } from '@prisma/client'

type UserWithTruck = Prisma.UserGetPayload<{
  include: { truck: true }
}>

export interface UsersRepository {
  findById(id: string): Promise<UserWithTruck | null>
  findByEmail(email: string): Promise<UserWithTruck | null>
  findByGoogleId(googleId: string): Promise<UserWithTruck | null>
  create(data: Prisma.UserCreateInput): Promise<PrismaUser>
  save(id: string, data: Prisma.UserUpdateInput): Promise<PrismaUser>
}
