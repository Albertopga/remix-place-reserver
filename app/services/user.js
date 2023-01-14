import { db } from './db'

export class UserService {
  createUser = (data) => {
    const payload = {
      data: {
        name: data.name.toUpperCase(),
        surname: data.surname.toUpperCase(),
        email: data.email.toUpperCase(),
        role_id: data.role_id,
        password: data.password
      }
    }
    return db.user.create(payload)
  }

  getUsers = () => {
    return db.user.findMany()
  }

  getUserById = (id) => {
    const where = { where: { id } }
    const user = db.user.findUnique(where)
    delete user.password
    return user
  }

  getUserByEmail = async (email) => {
    email = email.toUpperCase()
    const result = await db.$queryRaw`SELECT user.*, role.role FROM user INNER JOIN role ON user.role_id = role.id AND user.email = ${email};`
    return result[0]
  }

  getUserByRole = (role) => {
    return db.$queryRaw`SELECT * FROM user INNER JOIN role ON user.role_id = role.id AND user.id = ${role}`
  }

  editUserRole = (data) => {
    const where = {
      where: { id: data.id },
      data: { role: data.role }
    }
    return db.user.update(where, data)
  }

  createUsers = (data) => {
    return db.user.createMany(data)
  }

  deleteUser = (id) => {
    const where = { where: { id } }
    return db.user.delete(where)
  }
}
