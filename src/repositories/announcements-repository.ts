import { Announcement, Prisma } from '@prisma/client'

/*
Prisma.AnnouncementCreateInput should be used if user is not created, when user is already created we use AnnouncementUncheckedCreateInput, then we can use userId
*/

export interface AnnouncementsRepository {
  create(data: Prisma.AnnouncementUncheckedCreateInput): Promise<Announcement>
}
