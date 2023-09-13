import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Truck (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an truck', async () => {
    const { token } = await createAndAuthenticateUser(app, 'TRUCKER')

    const response = await request(app.server)
      .post('/trucks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        truckModel: 'any_truck',
        capacity: 4242,
        length: 4242,
        width: 4242,
        height: 4242,
      })

    expect(response.statusCode).toEqual(201)
  })
})
