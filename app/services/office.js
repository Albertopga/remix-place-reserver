import { db } from './db'

export class OfficeService {
  createOffice = (officeData) => {
    const payload = { data: { officeData } }
    return db.office.create(payload)
  }

  getOfficeById = (id) => {
    const where = { where: { id } }
    return db.office.findUnique(where)
  }

  getOfficeByCity = (city) => {
    const where = { where: { city } }
    return db.office.findUnique(where)
  }

  editOffice = (data) => {
    const where = {
      where: { id: data.id },
      data: { data }
    }
    return db.office.update(where, data)
  }

  createOffices = (data) => {
    return db.office.createMany(data)
  }

  getOffices = () => {
    return db.office.findMany()
  }

  deleteOffice = (id) => {
    const where = { where: { id } }
    return db.office.delete(where)
  }
}
