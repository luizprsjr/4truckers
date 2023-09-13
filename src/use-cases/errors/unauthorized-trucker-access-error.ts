export class UnauthorizedTruckerAccessError extends Error {
  constructor() {
    super('Only truckers are allowed to perform this action.')
  }
}
