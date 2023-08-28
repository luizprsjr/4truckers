import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryAnnouncementsRepository } from '@/repositories/in-memory/in-memory-announcements-repository'

import { FetchAnnouncementsUseCase } from './fetch-announcements'

let announcementsRepository: InMemoryAnnouncementsRepository
let sut: FetchAnnouncementsUseCase

describe('Fetch Announcements Use Case', () => {
  beforeEach(() => {
    announcementsRepository = new InMemoryAnnouncementsRepository()
    sut = new FetchAnnouncementsUseCase(announcementsRepository)
  })

  it('should be fetch all announcements', async () => {
    await announcementsRepository.create({
      userId: 'user-01',
      departureCity: 'any_city',
      departure: new Date(),
      arrivalCity: 'other_city',
    })

    await announcementsRepository.create({
      userId: 'user-02',
      departureCity: 'any_city2',
      departure: new Date(),
      arrivalCity: 'other_city2',
    })

    const { announcements } = await sut.execute()
    expect(announcements).toHaveLength(2)
  })
})
