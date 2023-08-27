import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { AnnouncementsRepository } from '../announcements-repository'

export class PrismaAnnouncementsRepository implements AnnouncementsRepository {
  async create(data: Prisma.AnnouncementUncheckedCreateInput) {
    const announcement = await prisma.announcement.create({
      data,
    })

    return announcement
  }
}
