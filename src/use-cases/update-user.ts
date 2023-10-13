import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateUserUseCaseRequest {
  id: string
  name?: string
  phoneNumber?: string
  type?: 'USER' | 'TRUCKER'
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    phoneNumber,
    type,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.save(id, {
      name,
      phoneNumber,
      type,
    })

    return { user }
  }
}
