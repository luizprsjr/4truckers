import { AnnouncementsRepository } from '@/repositories/announcements-repository'
import { Announcement } from '@prisma/client'

interface SearchAnnouncementUseCaseRequest {
  query: string
}

interface SearchAnnouncementUseCaseResponse {
  announcements: Announcement[]
}

export class SearchAnnouncementUseCase {
  constructor(private announcementsRepository: AnnouncementsRepository) {}

  async execute({
    query,
  }: SearchAnnouncementUseCaseRequest): Promise<SearchAnnouncementUseCaseResponse> {
    console.log('aqui::', query)
    const announcements = await this.announcementsRepository.searchMany(query)

    return { announcements }
  }
}
