import { PrismaTrucksRepository } from '@/repositories/prisma/prisma-trucks-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { AddTruckUseCase } from '../add-truck'

export function makeAddTruckUseCase() {
  const trucksRepository = new PrismaTrucksRepository()
  const usersRepository = new PrismaUsersRepository()
  const addTruckUseCase = new AddTruckUseCase(trucksRepository, usersRepository)

  return addTruckUseCase
}
