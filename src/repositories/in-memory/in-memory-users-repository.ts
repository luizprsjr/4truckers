import { randomUUID } from 'node:crypto'

import { Prisma, Truck, User } from '@prisma/client'

import { UsersRepository } from '../users-repository'

type UserWithTruck = User & {
  truck: Truck | null
}

export class InMemoryUsersRepository implements UsersRepository {
  public items: UserWithTruck[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      phoneNumber: data.phoneNumber,
      type: data.type ?? 'USER',
      truck: null,
      createdAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
