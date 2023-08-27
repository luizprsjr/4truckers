import { PrismaAnnouncementsRepository } from '@/repositories/prisma/prisma-announcements-repository'

import { AddAnnouncementUseCase } from '../add-announcement'

export function makeRegisterUseCase() {
  const announcementsRepository = new PrismaAnnouncementsRepository()
  const addAnnouncementUseCase = new AddAnnouncementUseCase(
    announcementsRepository,
  )

  return addAnnouncementUseCase
}
