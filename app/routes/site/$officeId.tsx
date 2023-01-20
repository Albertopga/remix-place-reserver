/* eslint-disable camelcase */
import { Link, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import type { Booking, Cell, User } from '~/types'
import { decodeToken, formatDate, getSession, isDeskCell } from '~/utils'
import { BookingService, SiteService } from '~/services'
import { Office } from '~/components/Office/Office'

export const loader = async ({ params, request }: any) => {
  checkTokenValidity(request)

  const { officeId } = params
  const _siteService = new SiteService()
  const sites = await _siteService.getSitesByOfficeId(officeId)

  const _bookingService = new BookingService()
  const weekBooking = await _bookingService.getBookingsByDate(restOfWeekPlusOneMore()) as Booking[]

  return { sites, weekBooking }
}

export async function action ({ request }:any) {
  // TODO por que me entra aqui nada mas llegar !!!!!
  console.log('👊 ~ action')
  const user_id = await (await checkTokenValidity(request)).id
  const formData = await request.formData()
  const site_id = formData.get('_siteId')
  const date = formData.get('_bookingDate')
  const isBooking = formData.get('_bookingStatus')

  // TODO cuando vea el motivo por el cual me entra en el action sin haber submiteado revisar las validaciones
  // if (!site_id) throw new Error('Site_id is required')
  // if (!user_id) throw new Error('User_id is required')
  // if (!date) throw new Error('Date is required')

  const _bookingService = new BookingService()

  // TODO cuando vea el motivo por el cual me entra en el action sin haber submiteado, quitar el else y la comparacion a true o false :S
  if (isBooking === 'true') {
    await _bookingService.createBooking({ site_id, user_id, date })
  } else if (isBooking === 'false') {
    await _bookingService.deleteBooking(site_id, user_id, date)
  }

  return null
}

async function checkTokenValidity (request: any) {
  const session = await getSession(request.headers.get('Cookie'))
  const res: any = decodeToken(session.get('token'))
  if (res.message) throw new Error(res.message)
  return res.data as User
}

export function ErrorBoundary ({ error }:any) {
  return (
    <div>
      <p>{ error.message }</p>
      <Link to='/login'>Volver al Login</Link>
    </div>
  )
}

export default function SelectSite () {
  const { sites, weekBooking } = useLoaderData()
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const [occupiedSites, setOccupiedSites] = useState<string[]>(getOccupiedSitesForSelectedDay(selectedDate, weekBooking))

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setOccupiedSites(getOccupiedSitesForSelectedDay(date, weekBooking))
  }

  const handleClickCell = (cell: Cell, event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    if (isDeskCell(cell)) {
      if (cell.occupied) {
        setOccupiedSites((prevState: string[]) => prevState.filter(idSite => idSite !== cell.id))
      } else {
        setOccupiedSites((prevState: string[]) => [...prevState, cell.id])
      }
    }
  }

  return (
    <>
      {sites && (
        <section className='flex flex-col items-center'>
          <h3 className='t-h3'>Selecciona el día para el que vas a reservar</h3>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={selectedDate}
            onChange={(date: Date) => handleDateChange(date)}
            inline
            minDate={new Date()}
            maxDate={restOfWeekPlusOneMore()}
          />
        </section>
      )}
      {sites && selectedDate && (
        <>
          <Office handleClickCell={handleClickCell} occupiedSites={occupiedSites} date={selectedDate}/>
        </>
      )}
    </>
  )
}

function getOccupiedSitesForSelectedDay (selectedDate: Date, weekBooking: Booking[]): string[] {
  const reservedSites: string[] = []
  weekBooking.forEach(site => {
    const formattedBookingDate = formatDate(new Date(site.bookingAt))
    const formattedSelectedDate = formatDate(selectedDate)

    if (formattedBookingDate === formattedSelectedDate) reservedSites.push('' + site.site_id)
  })

  return reservedSites
}

function restOfWeekPlusOneMore () {
  // week start on Sunday and getDay return 0
  // week end on Saturday and getDay return 6
  const endOfWeek = 6
  const daysOnWeek = 7
  const date = new Date()
  const today = date.getDay()
  return new Date(date.setDate(date.getDate() + daysOnWeek + (endOfWeek - today)))
}
