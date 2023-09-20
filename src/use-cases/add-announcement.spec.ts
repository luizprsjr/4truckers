import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { InMemoryAnnouncementsRepository } from '@/repositories/in-memory/in-memory-announcements-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { makeAnnouncement } from '@/utils/test/usecases/makeAnnouncement'
import { makeUser } from '@/utils/test/usecases/makeUser'

import { AddAnnouncementUseCase } from './add-announcement'

let announcementsRepository: InMemoryAnnouncementsRepository
let usersRepository: InMemoryUsersRepository
let sut: AddAnnouncementUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    announcementsRepository = new InMemoryAnnouncementsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new AddAnnouncementUseCase(announcementsRepository, usersRepository)

    await vitest
      .spyOn(usersRepository, 'findById')
      .mockResolvedValue(makeUser())
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
