import { PrismaAnnouncementsRepository } from '@/repositories/prisma/prisma-announcements-repository'

import { SearchAnnouncementUseCase } from '../search-announcements'

export function makeSearchAnnouncementUseCase() {
  const announcementsRepository = new PrismaAnnouncementsRepository()
  const getAnnouncementUseCase = new SearchAnnouncementUseCase(
    announcementsRepository,
  )

  return getAnnouncementUseCase
}
