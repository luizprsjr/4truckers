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
      originDate: new Date(data.originDate),
      originEndDate: data.originEndDate ? new Date(data.originEndDate) : null,
      destinationCity: data.destinationCity,
      destinationDate: data.destinationDate
        ? new Date(data.destinationDate)
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
