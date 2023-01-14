import { Form } from '@remix-run/react'
import type { FunctionComponent } from 'react'
import type { HandleClickCellFn, Cell, ValladolidOfficeMapping } from '~/types'
import { isAisleCell, isDeskCell, isDoorCell, setOccupied, valladolidOfficeMapping } from '~/utils'

export const Office: FunctionComponent<{occupiedSites: string[], handleClickCell: HandleClickCellFn, date: Date}> = ({ occupiedSites, handleClickCell, date }) => {
  const tableRows = parseOfficeMapping(valladolidOfficeMapping, occupiedSites)

  return (
    <table id="office">
      <tbody>
        {tableRows.map((cells: Cell[], index:number) => (
          <tr key={index}>
            {cells.map((cell: Cell) => (
            <td
              key={cell.id}
              id={cell.id}
              className={cellClassNameFor(cell)}
              rowSpan={cell.rowSpan}
              colSpan={cell.colSpan}
              onClick={(e) => handleClickCell(cell, e)}
            >
              <Form id='cellForm' method='post'>
                {isDeskCell(cell)
                  ? <>
                    <input type="hidden" name="_siteId" value={cell.id} />
                    <input type="hidden" name="_bookingDate" value={date.toISOString()} />
                    <input type="hidden" name="_siteStatus" value={'' + cell.occupied} />
                    <button type="submit">{cell.id}</button>
                  </>
                  : ''}
              </Form>
            </td>))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function parseOfficeMapping (valladolidOfficeMapping: ValladolidOfficeMapping[], occupiedSites: string[]) {
  const tableRows: Cell[][] = []
  const officesMapping: ValladolidOfficeMapping[] = JSON.parse(JSON.stringify(valladolidOfficeMapping))

  Object.entries(officesMapping).forEach((key) => {
    const row: [string, Cell][] = Object.entries(key[1])
    const rowData = row.map((cellTd: [string, Cell]) => {
      const cell = cellTd[1]
      const idSite = cell.id
      occupiedSites.forEach(elem => {
        return elem === idSite && setOccupied(cell)
      })
      return cell as Cell
    })

    tableRows.push(rowData)
  })

  return tableRows
}

function cellClassNameFor (cell: Cell): string {
  const classes: string[] = []

  if (isAisleCell(cell)) classes.push('aisle')

  if (isDoorCell(cell)) classes.push('door')

  if (isDeskCell(cell) && cell.occupied) {
    classes.push('occupied')
  } else {
    classes.push('unoccupied')
  }

  if (isDeskCell(cell) && cell.withScreen) classes.push('screen')

  return classes.join(' ')
}
