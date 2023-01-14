import { db } from './db'

export class RoleService {
  createRole = (roleData) => {
    const payload = { data: { roleData } }
    return db.role.create(payload)
  }

  getRoles = () => {
    return db.role.findMany()
  }

  getRoleById = (id) => {
    const where = { where: { id } }
    return db.role.findUnique(where)
  }

  createRoles = (data) => {
    return db.role.createMany(data)
  }

  deleteRole = (id) => {
    const where = { where: { id } }
    return db.role.delete(where)
  }
}
