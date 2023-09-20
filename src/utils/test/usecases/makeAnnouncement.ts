type AdType = 'FREIGHT' | 'FREE_DRIVER'

export function makeAnnouncement() {
  return {
    userId: 'user_01',
    type: 'FREIGHT' as AdType,

    originCity: 'any_city',
    originDate: new Date(),
    originEndDate: new Date(),
    destinationCity: 'other_city',
    destinationDate: new Date(),

    weight: 4242,
    length: 4242,
    width: 4242,
    height: 4242,
    canStack: true,
    description: 'any-description',
  }
}
