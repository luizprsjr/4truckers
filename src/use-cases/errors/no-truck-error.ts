export class NoTruckError extends Error {
  constructor() {
    super('You need to have a truck to do this.')
  }
}
