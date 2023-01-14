import type { ValladolidOfficeMapping } from '~/types'

export const valladolidOfficeMapping: ValladolidOfficeMapping[] = [
  {
    td1: { id: '1', occupied: true, withScreen: true, type: 'desk', x: 1, y: 1 },
    td2: { id: '2', occupied: true, withScreen: true, type: 'desk', x: 2, y: 1 },
    td3: { id: 'ai1', type: 'aisle', rowSpan: 2, x: 3, y: 1 },
    td4: { id: 'ai2', type: 'aisle', colSpan: 4, x: 4, y: 1 }
  },
  {
    td1: { id: '3', occupied: true, withScreen: true, type: 'desk', x: 1, y: 2 },
    td2: { id: '4', occupied: true, withScreen: true, type: 'desk', x: 2, y: 2 },
    td3: { id: 'ai3', type: 'aisle', rowSpan: 7, x: 3, y: 2 },
    td4: { id: '5', occupied: false, withScreen: true, type: 'desk', x: 4, y: 2 },
    td5: { id: '6', occupied: false, withScreen: false, type: 'desk', x: 5, y: 2 },
    td6: { id: '7', occupied: false, withScreen: true, type: 'desk', x: 6, y: 2 }
  },
  {
    td1: { id: 'ai4', type: 'aisle', colSpan: 3, x: 1, y: 3 },
    td2: { id: 'ai5', type: 'aisle', colSpan: 3, x: 2, y: 3 }
  },
  {
    td1: { id: '8', occupied: false, withScreen: true, type: 'desk', x: 1, y: 4 },
    td2: { id: '9', occupied: false, withScreen: false, type: 'desk', x: 2, y: 4 },
    td3: { id: '10', occupied: false, withScreen: true, type: 'desk', x: 3, y: 4 },
    td4: { id: '11', occupied: false, withScreen: true, type: 'desk', x: 4, y: 4 },
    td5: { id: '12', occupied: false, withScreen: false, type: 'desk', x: 5, y: 4 },
    td6: { id: '13', occupied: false, withScreen: true, type: 'desk', x: 6, y: 4 }
  },
  {
    td1: { id: '14', occupied: false, withScreen: true, type: 'desk', x: 1, y: 5 },
    td2: { id: '15', occupied: false, withScreen: true, type: 'desk', x: 2, y: 5 },
    td3: { id: '16', occupied: false, withScreen: true, type: 'desk', x: 3, y: 5 },
    td4: { id: '17', occupied: false, withScreen: true, type: 'desk', x: 4, y: 5 },
    td5: { id: '18', occupied: false, withScreen: true, type: 'desk', x: 5, y: 5 },
    td6: { id: '19', occupied: false, withScreen: true, type: 'desk', x: 6, y: 5 }
  },
  {
    td1: { id: 'ai6', type: 'aisle', colSpan: 3, x: 1, y: 6 },
    td2: { id: 'ai7', type: 'aisle', colSpan: 3, x: 2, y: 6 }
  },
  {
    td1: { id: '20', occupied: false, withScreen: true, type: 'desk', x: 1, y: 7 },
    td2: { id: '21', occupied: false, withScreen: false, type: 'desk', x: 2, y: 7 },
    td3: { id: '22', occupied: false, withScreen: true, type: 'desk', x: 3, y: 7 },
    td4: { id: '23', occupied: false, withScreen: true, type: 'desk', x: 4, y: 7 },
    td5: { id: '24', occupied: false, withScreen: false, type: 'desk', x: 5, y: 7 },
    td6: { id: '25', occupied: false, withScreen: true, type: 'desk', x: 6, y: 7 }
  },
  {
    td1: { id: '26', occupied: false, withScreen: true, type: 'desk', x: 1, y: 8 },
    td2: { id: '27', occupied: false, withScreen: true, type: 'desk', x: 2, y: 8 },
    td3: { id: '28', occupied: false, withScreen: false, type: 'desk', x: 3, y: 8 },
    td4: { id: '29', occupied: false, withScreen: true, type: 'desk', x: 4, y: 8 },
    td5: { id: '30', occupied: false, withScreen: false, type: 'desk', x: 5, y: 8 },
    td6: { id: '31', occupied: false, withScreen: true, type: 'desk', x: 6, y: 8 }
  },
  {
    td1: { id: 'ai8', type: 'aisle', colSpan: 3, x: 1, y: 9 },
    td2: { id: 'ai9', type: 'door', x: 2, y: 9 },
    td3: { id: 'ai10', type: 'aisle', colSpan: 3, x: 3, y: 9 }
  }
]
