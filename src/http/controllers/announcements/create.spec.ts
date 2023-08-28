import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Announcement (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an announcement', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const response = await request(app.server)
      .post('/announcements')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user.id,
        departure: new Date(),
        departureCity: 'any_city',
        arrivalCity: 'other_city',
      })

    expect(response.statusCode).toEqual(201)
  })
})
