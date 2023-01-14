import type { Cell, AisleCell, DoorCell, DeskCell } from '~/types'

export function setOccupied (cell: Cell) {
  if (isDeskCell(cell)) cell.occupied = true
}

export function isAisleCell (cell: Cell): cell is AisleCell {
  return cell.type === 'aisle'
}

export function isDoorCell (cell: Cell): cell is DoorCell {
  return cell.type === 'door'
}

export function isDeskCell (cell: Cell): cell is DeskCell {
  return cell.type === 'desk'
}
