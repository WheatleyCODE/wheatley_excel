export function isCell(event) {
  return event.target.dataset.id
}

export function keyDownLogic($target, event, context, newRow, newCol) {
  const select = (event, row, col) => {
    event.preventDefault()
    const elem = context.$root.find(`[data-id="${row}:${col}"]`)
    if (elem.$el) {
      elem.focus()
      context.selectCell(elem)
      context.updateTextInStore(elem, elem.text())
      return elem
    }
  }

  if ($target.data.id) {
    switch (event.key) {
      case 'ArrowUp':
        select(event, newRow - 1, newCol)
        break
      case 'ArrowDown':
        select(event, newRow + 1, newCol)
        break
      case 'ArrowLeft':
        select(event, newRow, newCol - 1)
        break
      case 'Tab':
      case 'ArrowRight':
        select(event, newRow, newCol + 1)
        break
      case 'Enter': {
        if (!event.shiftKey) {
          select(event, newRow + 1, newCol)
        }
      }
        break
    }
  }
}

export function shiftUpCellSelect(lastRow, lastCol, newRow, newCol, context) {
  const arr = []

  if (+lastRow >= +newRow) {
    if (+lastCol <= +newCol) {
      for (let j = 0; j <= newCol - lastCol; j++) {
        for (let i = +newRow; i <= +lastRow; i++) {
          arr.push(context.$root.find(`[data-id="${+lastRow - (lastRow - i)}:${+lastCol + j}"]`))
        }
      }
    } else if (+lastCol >= +newCol) {
      for (let j = 0; j <= lastCol - newCol; j++) {
        for (let i = +newRow; i <= +lastRow; i++) {
          arr.push(context.$root.find(`[data-id="${+lastRow - (lastRow - i)}:${+lastCol - j}"]`))
        }
      }
    }
  } else if (+lastRow <= +newRow) {
    if (+lastCol <= +newCol) {
      for (let j = 0; j <= newCol - lastCol; j++) {
        for (let i = 0; i <= newRow - lastRow; i++) {
          arr.push(context.$root.find(`[data-id="${+lastRow + i}:${+lastCol + j}"]`))
        }
      }
    } else if (+lastCol >= +newCol) {
      for (let j = 0; j <= lastCol - newCol; j++) {
        for (let i = 0; i <= newRow - lastRow; i++) {
          arr.push(context.$root.find(`[data-id="${+lastRow + i}:${+lastCol - j}"]`))
        }
      }
    }
  }

  return arr
}
