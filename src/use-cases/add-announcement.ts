import { AnnouncementsRepository } from '@/repositories/announcements-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Announcement } from '@prisma/client'

import { NoTruckError } from './errors/no-truck-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AddAnnouncementUseCaseRequest {
  userId: string

  originCity: string
  originDate: Date
  originEndDate?: Date
  destinationCity: string
  destinationDate?: Date
  destinationEndDate?: Date

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
  constructor(
    private announcementsRepository: AnnouncementsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    originCity,
    originDate,
    originEndDate,
    destinationCity,
    destinationDate,
    destinationEndDate,
    description,
    weight,
    length,
    width,
    height,
    canStack,
  }: AddAnnouncementUseCaseRequest): Promise<AddAnnouncementUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (user.type === 'TRUCKER' && !user.truck) {
      throw new NoTruckError()
    }

    const type = user.type === 'TRUCKER' ? 'FREE_DRIVER' : 'FREIGHT'

    const announcement = await this.announcementsRepository.create({
      userId,
      type,
      originCity,
      originDate,
      originEndDate,
      destinationCity,
      destinationDate,
      destinationEndDate,
      description,
      weight: weight ?? user.truck?.capacity,
      length: length ?? user.truck?.length,
      width: width ?? user.truck?.width,
      height: height ?? user.truck?.height,
      canStack,
    })

    return { announcement }
  }
}
