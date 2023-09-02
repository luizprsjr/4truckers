import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      confirmPassword: '123456',
      phoneNumber: '24998123508',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should return the correct validation error message for each required field', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'jj',
      email: 'john',
      password: '12345',
      confirmPassword: '123457',
      phoneNumber: '111111',
    })

    expect(response.statusCode).toEqual(400)
    expect(JSON.parse(response.text)).toEqual({
      message: {
        name: 'The name needs to have as least 3 characters.',
        email: 'Provide a valid email.',
        password: 'The password needs to have at least 6 characters.',
        confirmPassword: 'Password does not match.',
        phoneNumber: 'Invalid phone number.',
      },
    })
  })
})
