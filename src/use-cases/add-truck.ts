import { TrucksRepository } from '@/repositories/trucks-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Truck } from '@prisma/client'

import { UnauthorizedTruckerAccessError } from './errors/unauthorized-trucker-access-error'

interface AddTruckUseCaseRequest {
  userId: string
  truckModel: string
  capacity: number
  length?: number
  width?: number
  height?: number
}

interface AddTruckUseCaseResponse {
  truck: Truck
}

export class AddTruckUseCase {
  constructor(
    private trucksRepository: TrucksRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    truckModel,
    capacity,
    length,
    width,
    height,
  }: AddTruckUseCaseRequest): Promise<AddTruckUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (user?.type !== 'TRUCKER') {
      throw new UnauthorizedTruckerAccessError()
    }

    const truck = await this.trucksRepository.create({
      userId,
      truckModel,
      capacity,
      length,
      width,
      height,
    })

    return { truck }
  }
}
