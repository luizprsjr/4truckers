import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { InMemoryTrucksRepository } from '@/repositories/in-memory/in-memory-trucks-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { makeTruck } from '@/utils/test/usecases/makeTruck'
import { makeUser } from '@/utils/test/usecases/makeUser'

import { AddTruckUseCase } from './add-truck'
import { UnauthorizedTruckerAccessError } from './errors/unauthorized-trucker-access-error'

let trucksRepository: InMemoryTrucksRepository
let usersRepository: InMemoryUsersRepository
let sut: AddTruckUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    trucksRepository = new InMemoryTrucksRepository()
    usersRepository = new InMemoryUsersRepository()

    sut = new AddTruckUseCase(trucksRepository, usersRepository)

    await vitest
      .spyOn(usersRepository, 'findById')
      .mockResolvedValue(makeUser('TRUCKER'))
  })

  it('should be able to call execute method with correct values', async () => {
    const newTruck = makeTruck()
    const spy = vitest.spyOn(sut, 'execute')
    await sut.execute(newTruck)

    expect(spy).toBeCalledWith(newTruck)
  })

  it('should be able to add a new truck with correct user id', async () => {
    const user = makeUser('TRUCKER')
    const newTruck = makeTruck(user.id)
    const { truck } = await sut.execute(newTruck)

    expect(truck.userId).toBe(user.id)
  })

  it('should be able to add a new truck with correct values', async () => {
    const newTruck = makeTruck()
    const { truck } = await sut.execute(newTruck)

    expect(truck.id).toBeTypeOf('string')
    expect(truck.truckModel).toBeTypeOf('string')
    expect(truck.capacity).toBeTypeOf('number')
    expect(truck.length).toBeTypeOf('number')
    expect(truck.width).toBeTypeOf('number')
    expect(truck.height).toBeTypeOf('number')
  })

  it('should return as error if user is not a trucker', async () => {
    const newTruck = makeTruck()
    await vitest
      .spyOn(usersRepository, 'findById')
      .mockResolvedValue(makeUser('USER'))

    await expect(() => sut.execute(newTruck)).rejects.toBeInstanceOf(
      UnauthorizedTruckerAccessError,
    )
  })
})
