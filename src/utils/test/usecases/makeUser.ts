export function makeUser(type = 'USER' as 'USER' | 'TRUCKER') {
  return {
    id: 'user_01',
    name: 'any_user_name',
    email: 'eny_mail@mail.com',
    passwordHash: 'any_hash',
    phoneNumber: '9999',
    type,
    truck: null,
    createdAt: new Date(),
  }
}
