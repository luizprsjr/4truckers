import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { AnnouncementsRepository } from '../announcements-repository'

export class PrismaAnnouncementsRepository implements AnnouncementsRepository {
  async findById(id: string) {
    const announcement = await prisma.announcement.findFirstOrThrow({
      where: { id },
      include: {
        user: {
          include: {
            truck: true,
          },
        },
      },
    })

    return announcement
  }

  async searchMany(query: string) {
    const announcements = await prisma.announcement.findMany({
      where: {
        originCity: {
          contains: query,
          mode: 'insensitive',
        },
      },
    })

    return announcements
  }

  async findAll() {
    const currentDate = new Date()

    const announcements = await prisma.announcement.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                originDate: {
                  lte: currentDate, // Start date in the past
                },
              },
              {
                originEndDate: {
                  gte: currentDate, // End date in the future or null
                },
              },
            ],
          },
          {
            originDate: {
              gte: currentDate, // Start date in the future
            },
          },
        ],
      },
      include: { user: true },
      orderBy: { originDate: 'asc' },
    })

    return announcements
  }

  async create(data: Prisma.AnnouncementUncheckedCreateInput) {
    const announcement = await prisma.announcement.create({
      data,
    })

    return announcement
  }
}
