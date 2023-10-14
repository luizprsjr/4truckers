import { Prisma, User as PrismaUser } from '@prisma/client'

export type UserWithTruck = Prisma.UserGetPayload<{
  include: { truck: true }
}>

export interface UsersRepository {
  findById(id: string): Promise<UserWithTruck | null>
  findByEmail(email: string): Promise<UserWithTruck | null>
  findByGoogleId(googleId: string): Promise<UserWithTruck | null>
  create(data: Prisma.UserCreateInput): Promise<PrismaUser>
  save(
    id: string,
    userData: Prisma.UserUpdateInput,
    truckData: Prisma.TruckUpdateInput,
  ): Promise<UserWithTruck>
}
