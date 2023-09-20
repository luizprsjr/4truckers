import { PrismaAnnouncementsRepository } from '@/repositories/prisma/prisma-announcements-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { AddAnnouncementUseCase } from '../add-announcement'

export function makeAddAnnouncementUseCase() {
  const announcementsRepository = new PrismaAnnouncementsRepository()
  const usersRepository = new PrismaUsersRepository()
  const addAnnouncementUseCase = new AddAnnouncementUseCase(
    announcementsRepository,
    usersRepository,
  )

  return addAnnouncementUseCase
}
