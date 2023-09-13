import { randomUUID } from 'node:crypto'

import { Prisma, Truck } from '@prisma/client'

import { TrucksRepository } from '../trucks-repository'

export class InMemoryTrucksRepository implements TrucksRepository {
  public items: Truck[] = []

  async create(data: Prisma.TruckUncheckedCreateInput) {
    const truck: Truck = {
      id: randomUUID(),
      userId: data.userId,
      truckModel: data.truckModel,
      capacity: data.capacity ?? null,
      length: data.length ?? null,
      width: data.width ?? null,
      height: data.height ?? null,
    }

    this.items.push(truck)

    return truck
  }
}
