import { prisma } from '@/lib/prisma'
import { Prisma, Truck } from '@prisma/client'

import { UsersRepository, UserWithTruck } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        truck: true,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        truck: true,
      },
    })

    return user
  }

  async findByGoogleId(googleId: string) {
    const user = await prisma.user.findUnique({
      where: { googleId },
      include: {
        truck: true,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async save(
    id: string,
    userData: Prisma.UserUpdateInput,
    truckData: Prisma.TruckUpdateInput,
  ) {
    let updatedUser: UserWithTruck = {} as UserWithTruck
    let updatedTruck: Truck | undefined

    try {
      await prisma.$transaction(async (prisma) => {
        updatedUser = await prisma.user.update({
          where: { id },
          data: userData,
          include: {
            truck: true,
          },
        })

        if (updatedUser.truck?.id) {
          updatedTruck = await prisma.truck.update({
            where: { id: updatedUser.truck.id },
            data: truckData,
          })

          updatedUser.truck = updatedTruck
        }
      })

      return updatedUser
    } catch (error) {
      console.error('Erro ao atualizar o perfil e o caminhão:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
}
