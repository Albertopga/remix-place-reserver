
export type User = {
  id?: string,
  createdAt?: string,
  updatedAt?: string,
  role_id?: number
  role?: string,
  email: string,
  name: string,
  surname: string,
  password?: string
}

export type Role = {
  'id': number,
  'role': string
}

export type Site = {
  'id': number,
  'screen': boolean,
  'occupied': boolean,
  'office_id': string,
  'office': Office
}

export type Office = {
  'id': string,
  'city': string,
}
export type Booking = {
  'id': string,
  'site_id': number,
  'user_id': string,
  'bookingAt': string,
  'updatedAt': string,
}

export interface ValladolidOfficeMapping {
  td1: Cell
  td2?: Cell
  td3?: Cell
  td4?: Cell
  td5?: Cell
  td6?: Cell
}

export type HandleClickCellFn = (cell: Cell, event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void

type CellPosition = {
  id: string
  rowSpan?: number,
  colSpan?: number,
  x: number,
  y: number,
}

export type AisleCell = CellPosition & {
  type: 'aisle'
}
export type DoorCell = CellPosition & {
  type: 'door'
}

export type DeskCell = CellPosition & {
  type: 'desk'
  occupied: boolean
  withScreen: boolean
}

export type Cell = AisleCell | DeskCell | DoorCell

export type NavRoute = { to: string, label: string, icon?: string }

export type btnSize = 'full' | 'screen' | 'min' | 'max' | 'fit'
