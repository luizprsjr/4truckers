import { PrismaAnnouncementsRepository } from '@/repositories/prisma/prisma-announcements-repository'

import { GetAnnouncementUseCase } from '../get-announcement'

export function makeGetAnnouncementUseCase() {
  const announcementsRepository = new PrismaAnnouncementsRepository()
  const getAnnouncementUseCase = new GetAnnouncementUseCase(
    announcementsRepository,
  )

  return getAnnouncementUseCase
}
