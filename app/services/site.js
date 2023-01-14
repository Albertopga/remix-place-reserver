/* eslint-disable camelcase */
import { db } from './db'

export class SiteService {
  createSite = (siteData) => {
    const payload = { data: { ...siteData } }
    return db.site.create(payload)
  }

  getSites = () => {
    return db.site.findMany()
  }

  getSiteById = (id) => {
    const where = { where: { id } }
    return db.site.findUnique(where)
  }

  getSitesByOfficeId = (office_id) => {
    const where = { where: { office_id } }
    return db.site.findMany(where)
  }

  getSitesByOfficeName = (officeName) => {
    return db.$queryRaw(`SELECT * FROM site INNER JOIN office ON site.office_id = office.id AND office.city = ${officeName}`)
  }

  editSiteRole = (data) => {
    const where = {
      where: { id: data.id },
      data: { role: data.role }
    }
    return db.site.update(where, data)
  }

  createSites = (data) => {
    return db.site.createMany(data)
  }

  deleteSite = (id) => {
    const where = { where: { id } }
    return db.site.delete(where)
  }
}
