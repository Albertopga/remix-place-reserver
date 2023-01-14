/* eslint-disable camelcase */
import { db } from './db'
import { v4 as uuidv4 } from 'uuid'
export class BookingService {
  createBooking = (bookingData) => {
    const uuid = uuidv4()
    const bookingAt = new Date(bookingData.date)
    bookingAt.setHours(0, 0, 0, 0)

    return db.$queryRaw`
      INSERT INTO office_sites_booking (id, site_id, user_id, bookingAt, updatedtedAt)
      VALUES(${uuid}, ${bookingData.site_id}, ${bookingData.user_id}, ${bookingAt}, ${bookingAt})
    `
  }

  getBookings = () => {
    return db.office_sites_booking.findMany()
  }

  getBookingByUserId = (userId) => {
    const where = { where: { userId } }
    return db.office_sites_booking.findUnique(where)
  }

  getBookingByDate = (date) => {
    const where = { where: { date } }
    return db.office_sites_booking.findUnique(where)
  }

  getBookingsByDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return db.$queryRaw`
      SELECT *
      FROM office_sites_booking
      WHERE bookingAt >= ${today}
      AND bookingAt <= ${date}
    `
  }

  deleteBooking = (site_id, user_id, date) => {
    // TODO hacer los cambios necesarios en bbdd para el borrado lógico
    const bookingAt = new Date(date)
    bookingAt.setHours(0, 0, 0, 0)

    return db.$queryRaw`DELETE from office_sites_booking
    WHERE site_id LIKE ${site_id}
    AND user_id LIKE ${user_id}
    AND bookingAt LIKE ${bookingAt}`
  }
}
