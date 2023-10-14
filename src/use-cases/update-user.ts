import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UserData {
  name?: string
  phoneNumber?: string
  type?: 'USER' | 'TRUCKER'
}

interface TruckData {
  truckModel?: string
  capacity?: number
  length?: number
  width?: number
  height?: number
}

interface UpdateUserUseCaseRequest {
  id: string
  userData: UserData
  truckData: TruckData
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    userData,
    truckData,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.save(id, userData, truckData)

    return { user }
  }
}
