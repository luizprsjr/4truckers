import { AnnouncementsRepository } from '@/repositories/announcements-repository'
import { Announcement } from '@prisma/client'

interface AddAnnouncementUseCaseRequest {
  userId: string
  description?: string
  weight?: number
  length?: number
  width?: number
  height?: number
  canStack?: boolean
  departure: Date
  departureCity: string
  arrival?: Date
  arrivalCity: string
}

interface AddAnnouncementUseCaseResponse {
  announcement: Announcement
}

export class AddAnnouncementUseCase {
  constructor(private announcementsRepository: AnnouncementsRepository) {}

  async execute({
    userId,
    description,
    weight,
    length,
    width,
    height,
    canStack,
    departure,
    departureCity,
    arrival,
    arrivalCity,
  }: AddAnnouncementUseCaseRequest): Promise<AddAnnouncementUseCaseResponse> {
    const announcement = await this.announcementsRepository.create({
      userId,
      description,
      weight,
      length,
      width,
      height,
      canStack,
      departure,
      departureCity,
      arrival,
      arrivalCity,
    })

    return { announcement }
  }
}
