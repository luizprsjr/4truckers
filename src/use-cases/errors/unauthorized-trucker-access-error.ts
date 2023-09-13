export class UnauthorizedTruckerAccessError extends Error {
  constructor() {
    super('Unauthorized access: Only trucker users are allowed.')
  }
}
