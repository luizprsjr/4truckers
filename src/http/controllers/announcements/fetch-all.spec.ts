import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/http/create-and-authenticate-user'

describe('Fetch all announcements (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all announcements', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    await request(app.server)
      .post('/announcements')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user.id,
        originCity: 'any_city',
        originDate: new Date(),
        destinationCity: 'other_city',
      })

    const response = await request(app.server)
      .get('/announcements')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toHaveLength(1)
  })
})
