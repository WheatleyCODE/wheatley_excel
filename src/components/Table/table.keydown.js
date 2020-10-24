export function isCell(event) {
  return event.target.dataset.id
}

export function keyDownLogic($target, event, context, newRow, newCol, dispatch) {
  if ($target.data.id) {
    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault()
        const elem = context.$root.find(`[data-id="${newRow - 1}:${newCol}"]`)
        if (elem.$el) {
          elem.focus()
          context.selectCell(elem)
          dispatch(elem, elem.text())
          return elem
        }
      }
        break
      case 'ArrowDown': {
        event.preventDefault()
        const elem = context.$root.find(`[data-id="${newRow + 1}:${newCol}"]`)
        if (elem.$el) {
          elem.focus()
          context.selectCell(elem)
          dispatch(elem, elem.text())
          return elem
        }
      }
        break
      case 'ArrowLeft': {
        event.preventDefault()
        const elem = context.$root.find(`[data-id="${newRow}:${newCol - 1}"]`)
        if (elem.$el) {
          elem.focus()
          context.selectCell(elem)
          dispatch(elem, elem.text())
          return elem
        }
      }
        break
      case 'ArrowRight': {
        event.preventDefault()
        const elem = context.$root.find(`[data-id="${newRow}:${newCol + 1}"]`)
        if (elem.$el) {
          elem.focus()
          context.selectCell(elem)
          dispatch(elem, elem.text())
          return elem
        }
      }
        break
      case 'Enter': {
        if (!event.shiftKey) {
          event.preventDefault()
          const elem = context.$root.find(`[data-id="${newRow + 1}:${newCol}"]`)
          if (elem.$el) {
            elem.focus()
            context.selectCell(elem)
            dispatch(elem, elem.text())
          }
        }
      }
        break
      case 'Tab': {
        event.preventDefault()
        const elem = context.$root.find(`[data-id="${newRow}:${newCol + 1}"]`)
        if (elem.$el) {
          elem.focus()
          context.selectCell(elem)
          dispatch(elem, elem.text())
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
