const CODES = {
  A: 65,
  Z: 90,
}

function createCell(el = '') {
  return `
    <div class="cell" contenteditable="">${el}</div>
  `
}

function createCol(el) {
  return `<div class="column">${el}</div>`
}

function createRow(content = 'H', index = '') {
  return `
    <div class="row">
      <div class="row-info">${index}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount = 30) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index) )
      .map((el) => createCol(el))
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
