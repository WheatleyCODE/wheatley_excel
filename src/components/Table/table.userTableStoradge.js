import { storage } from '@core/utils'

export function setUserTableStoradge($root) {
  const Table = storage('excel-state')

  if (Table) {
    Object.keys(Table.colState).forEach((id) => {
      const col = $root.findAll(`[data-col="${id}"]`)
      col.forEach((el) => {
        el.style.width = Table.colState[id] + 'px' //  Сделать оптимизацию
      })
    })
  }
  if (Table) {
    Object.keys(Table.rowState).forEach((id) => {
      const row = $root.find(`[data-row="${id}"]`)
      row.css({
        height: Table.rowState[id] + 'px',
      })
    })
  }
  if (Table) {
    Object.keys(Table.dataState).forEach((id) => {
      const cell = $root.find(`[data-id="${id}"]`)
      cell.text(Table.dataState[id])
    })
  }
  if (Table) {
    Object.keys(Table.dataStyles).forEach((id) => {
      const cell = $root.find(`[data-id="${id}"]`)
      cell.css(Table.dataStyles[id])
    })
  }
}
