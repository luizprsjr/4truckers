import { AnnouncementsRepository } from '@/repositories/announcements-repository'
import { Announcement } from '@prisma/client'

interface AddAnnouncementUseCaseRequest {
  userId: string
  type: 'FREIGHT' | 'FREE_DRIVER'

  originCity: string
  originDate: Date
  originEndDate?: Date
  destinationCity: string
  destinationDate?: Date

  weight?: number
  length?: number
  width?: number
  height?: number
  canStack?: boolean
  description?: string
}

interface AddAnnouncementUseCaseResponse {
  announcement: Announcement
}

export class AddAnnouncementUseCase {
  constructor(private announcementsRepository: AnnouncementsRepository) {}

  async execute({
    userId,
    type,
    originCity,
    originDate,
    originEndDate,
    destinationCity,
    destinationDate,
    description,
    weight,
    length,
    width,
    height,
    canStack,
  }: AddAnnouncementUseCaseRequest): Promise<AddAnnouncementUseCaseResponse> {
    const announcement = await this.announcementsRepository.create({
      userId,
      type,
      originCity,
      originDate,
      originEndDate,
      destinationCity,
      destinationDate,
      description,
      weight,
      length,
      width,
      height,
      canStack,
    })

    return { announcement }
  }
}
