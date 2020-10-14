const CODES = {
  A: 65,
  Z: 90,
}

function createCell(el = '', index) {
  return `
    <div class="cell" data-col="${index}" contenteditable="">${el}</div>
  `
}

function createCol(el, index) {
  return `<div class="column" data-col="${index}" data-type="resize">
    ${el}
    <div class="col-resize" data-resize="col" ></div>
  </div>`
}

function createRow(content = 'H', index = '') {
  const resizer = index > 0 ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resize">
      <div class="row-info">${index}${resizer}</div>
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
      .map((el, index) => createCol(el, index))
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map((el, index) => createCell(el, index))
        .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
