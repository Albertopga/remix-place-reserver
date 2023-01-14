/* eslint-disable camelcase */
import { db } from './db'

export class OfficeAdminsService {
  linkOfficeAdmin ({ office_id, user_id }) {
    const payload = { data: { office_id, user_id } }
    return db.office_admins.create(payload)
  }

  getOfficesAdmins () {
    return db.office_admins.findMany()
  }

  getOfficeAdmins (office_id) {
    return db.$queryRaw`
    SELECT *
    FROM office_admins
    INNER JOIN user
    ON user.id = office_admins.id
    INNER JOIN office
    ON office.id = office_admins.office_id
    AND office_admins.id = ${office_id}`
  }

  getManagedOffices (user_id) {
    return db.$queryRaw`
    SELECT office.*
    FROM user
    INNER JOIN office_admins
    ON user.id = office_admins.user_id
    INNER JOIN office
    ON office_admins.office_id = office.id
    AND office_admins.user_id = ${user_id}
    ;`
  }
}
