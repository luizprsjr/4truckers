import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { InMemoryAnnouncementsRepository } from '@/repositories/in-memory/in-memory-announcements-repository'

import { AddAnnouncementUseCase } from './add-announcement'

let announcementsRepository: InMemoryAnnouncementsRepository
let sut: AddAnnouncementUseCase

type AdType = 'FREIGHT' | 'FREE_DRIVER'

function makeAnnouncement() {
  return {
    userId: 'user-01',
    type: 'FREIGHT' as AdType,

    originCity: 'any_city',
    originDate: new Date(),
    originEndDate: new Date(),
    destinationCity: 'other_city',
    destinationDate: new Date(),

    weight: 4242,
    length: 4242,
    width: 4242,
    height: 4242,
    canStack: true,
    description: 'any-description',
  }
}

describe('Register Use Case', () => {
  beforeEach(() => {
    announcementsRepository = new InMemoryAnnouncementsRepository()
    sut = new AddAnnouncementUseCase(announcementsRepository)
  })

  it('should be able to call execute method with correct values', async () => {
    const newAnnouncement = makeAnnouncement()
    const spy = vitest.spyOn(sut, 'execute')
    await sut.execute(newAnnouncement)

    expect(spy).toBeCalledWith(newAnnouncement)
  })

  it('should be able to add a new announcement with correct user id', async () => {
    const newAnnouncement = makeAnnouncement()
    const { announcement } = await sut.execute(newAnnouncement)

    expect(announcement.userId).toBe(newAnnouncement.userId)
  })

  it('should be able to add a new announcement with correct values', async () => {
    const newAnnouncement = makeAnnouncement()
    const { announcement } = await sut.execute(newAnnouncement)
    const { createdAt, id, ...createdAnnouncement } = announcement

    expect(id).toBeTypeOf('string')
    expect(createdAt).toBeTypeOf('object')
    expect(createdAnnouncement).toEqual(newAnnouncement)
  })
})
