import {
  AnnouncementsRepository,
  AnnouncementWithUser,
} from '@/repositories/announcements-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetAnnouncementUseCaseRequest {
  id: string
}

interface GetAnnouncementUseCaseResponse {
  announcement: AnnouncementWithUser
}

export class GetAnnouncementUseCase {
  constructor(private announcementsRepository: AnnouncementsRepository) {}

  async execute({
    id,
  }: GetAnnouncementUseCaseRequest): Promise<GetAnnouncementUseCaseResponse> {
    const announcement = await this.announcementsRepository.findById(id)

    if (!announcement) {
      throw new ResourceNotFoundError()
    }

    return { announcement }
  }
}
