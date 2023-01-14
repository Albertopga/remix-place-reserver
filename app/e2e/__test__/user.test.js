import { UserService } from '../../services/user'

describe('users test', () => {
  const db = new UserService()

  it('create should be return 200', async () => {
    const res = await db.getUsers()
    expect(res.statusCode).toBe(200)
  })
})
