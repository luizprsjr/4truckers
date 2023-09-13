import { Prisma, Truck } from '@prisma/client'

export interface TrucksRepository {
  create(data: Prisma.TruckUncheckedCreateInput): Promise<Truck>
}
