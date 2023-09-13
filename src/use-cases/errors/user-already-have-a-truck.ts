export class UserAlreadyHaveATruck extends Error {
  constructor() {
    super('User already have a truck.')
  }
}
