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
      description: data.description ?? null,
      weight: data.weight ?? null,
      length: data.length ?? null,
      width: data.width ?? null,
      height: data.height ?? null,
      canStack: data.canStack ?? null,
      departure: new Date(data.departure),
      departureCity: data.departureCity,
      arrival: data.arrival ? new Date(data.arrival) : null,
      arrivalCity: data.arrivalCity ?? null,
      createdAt: new Date(),
    }

    this.items.push(announcement)

    return announcement
  }
}
