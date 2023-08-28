import { AnnouncementsRepository } from '@/repositories/announcements-repository'
import { Announcement } from '@prisma/client'

interface FetchAnnouncementsUseCaseResponse {
  announcements: Announcement[]
}

export class FetchAnnouncementsUseCase {
  constructor(private announcementsRepository: AnnouncementsRepository) {}

  async execute(): Promise<FetchAnnouncementsUseCaseResponse> {
    const announcements = await this.announcementsRepository.findAll()

    // if (!announcements) {
    //   throw new ResourceNotFoundError()
    // }

    return { announcements }
  }
}
