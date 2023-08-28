import { PrismaAnnouncementsRepository } from '@/repositories/prisma/prisma-announcements-repository'

import { FetchAnnouncementsUseCase } from '../fetch-announcements'

export function makeFetchAnnouncementsUseCase() {
  const announcementsRepository = new PrismaAnnouncementsRepository()
  const fetchAnnouncementsUseCase = new FetchAnnouncementsUseCase(
    announcementsRepository,
  )

  return fetchAnnouncementsUseCase
}
