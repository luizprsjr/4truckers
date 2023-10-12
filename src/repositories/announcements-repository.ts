import { Announcement, Prisma } from '@prisma/client'

/*
Prisma.AnnouncementCreateInput should be used if user is not created, when user is already created we use AnnouncementUncheckedCreateInput, then we can use userId
*/

export type AnnouncementWithUser = Prisma.AnnouncementGetPayload<{
  include: { user: true }
}>

export interface AnnouncementsRepository {
  findById(id: string): Promise<AnnouncementWithUser>
  searchMany(query: string): Promise<Announcement[]>
  findAll(): Promise<Announcement[]>
  create(data: Prisma.AnnouncementUncheckedCreateInput): Promise<Announcement>
}
