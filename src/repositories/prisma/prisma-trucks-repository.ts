import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { TrucksRepository } from '../trucks-repository'

export class PrismaTrucksRepository implements TrucksRepository {
  async create(data: Prisma.TruckUncheckedCreateInput) {
    const truck = await prisma.truck.create({
      data,
    })

    return truck
  }
}
