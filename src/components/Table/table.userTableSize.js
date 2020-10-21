import { storage } from '@core/utils'

export function setUserTableSize($root) {
  const TableSize = storage('excel-state')
  if (TableSize) {
    Object.keys(TableSize.colState).forEach((id) => {
      const col = $root.findAll(`[data-col="${id}"]`)
      col.forEach((el) => {
        el.style.width = TableSize.colState[id] + 'px' //  Сделать оптимизацию
      })
    })
  }
  if (TableSize) {
    Object.keys(TableSize.rowState).forEach((id) => {
      const row = $root.find(`[data-row="${id}"]`)
      row.css({
        height: TableSize.rowState[id] + 'px',
      })
    })
  }
}
