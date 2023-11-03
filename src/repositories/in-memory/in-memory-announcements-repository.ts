import { randomUUID } from 'node:crypto'

import { Announcement, Prisma } from '@prisma/client'

import { AnnouncementsRepository } from '../announcements-repository'

export class InMemoryAnnouncementsRepository
  implements AnnouncementsRepository
{
  public items: Announcement[] = []

  async findAll() {
    return this.items
  }

  async create(data: Prisma.AnnouncementUncheckedCreateInput) {
    const announcement = {
      id: randomUUID(),
      userId: data.userId,
      type: data.type,

      originCity: data.originCity,
      pickupOrDepartureDate: new Date(data.pickupOrDepartureDate),
      pickUpMaxDate: data.pickUpMaxDate ? new Date(data.pickUpMaxDate) : null,
      destinationCity: data.destinationCity,
      arrivalOrDeliveryDate: data.arrivalOrDeliveryDate
        ? new Date(data.arrivalOrDeliveryDate)
        : null,

      weight: data.weight ?? null,
      length: data.length ?? null,
      width: data.width ?? null,
      height: data.height ?? null,
      canStack: data.canStack ?? null,
      description: data.description ?? null,

      createdAt: new Date(),
    }

    this.items.push(announcement)

    return announcement
  }
}
