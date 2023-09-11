import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      confirmPassword: '123456',
      phoneNumber: '24998123508',
    })

    const { body } = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const OldRefreshToken = body.refreshToken

    const response = await request(app.server).patch('/token/refresh').send({
      oldRefreshToken: OldRefreshToken,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      refreshToken: expect.any(String),
      token: expect.any(String),
    })
    expect(response.body.refreshToken.id).not.toBe(OldRefreshToken)
  })
})
