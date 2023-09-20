import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { createAndAuthenticateUser } from './create-and-authenticate-user'

export async function createAndAuthenticateTruckerWithTruck(
  app: FastifyInstance,
) {
  const { token } = await createAndAuthenticateUser(app, 'TRUCKER')

  await request(app.server)
    .post('/trucks')
    .set('Authorization', `Bearer ${token}`)
    .send({
      truckModel: 'any_truck',
      capacity: 4242,
      length: 4242,
      width: 4242,
      height: 4242,
    })

  return { token }
}
