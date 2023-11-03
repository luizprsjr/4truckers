type AdType = 'FREIGHT' | 'FREE_DRIVER'

export function makeAnnouncement() {
  return {
    userId: 'user_01',
    type: 'FREIGHT' as AdType,

    originCity: 'any_city',
    pickupOrDepartureDate: new Date(),
    pickUpMaxDate: new Date(),
    destinationCity: 'other_city',
    arrivalOrDeliveryDate: new Date(),

    weight: 4242,
    length: 4242,
    width: 4242,
    height: 4242,
    canStack: true,
    description: 'any-description',
  }
}
