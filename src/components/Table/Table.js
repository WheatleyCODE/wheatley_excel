import { Component } from '@core/Component'
import { createTable } from './table.template'
import { $ } from '@core/dom'
import { rowResize, colResize } from './table.resize'
import { TableSelection } from './TableSelection'
import { isCell, keyDownLogic, shiftUpCellSelect } from './table.keydown'
import { colsResizeAC, rowsResizeAC } from '@/redux/actions'
import { setUserTableSize } from './table.userTableSize'

export class Table extends Component {
  // Компонент Таблицы
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'click', 'keyup'],
      ...options,
    })
    this.lastTarget = 'Та самая клетка'
  }

  // Метод который уже вызывается после рендера компонентов
  // (исппользуем для инициализации TableSelection логики)
  init() {
    super.init()
    this.selection = new TableSelection

    const $defaultCell = this.$root.find('[data-id="0:0"]')
    this.lastTarget = $defaultCell
    this.selection.select($defaultCell)

    this.$on('formula:input', (text) => {
      this.lastTarget.text(text)
    })

    this.$on('formula:enter', () => {
      this.lastTarget.focus()
    })

    this.$emit('table:input', $defaultCell.text())
    this.$subscribe((state) => {
      console.log('TableState', state)
    })

    // Проверяем есть ли что-то в сторадже если есть изменяем
    setUserTableSize(this.$root)
  }

  toHTML() {
    return createTable(45)
  }

  async resizeTableRow($target, $parent, coords) {
    try {
      const data = await rowResize($target, $parent, coords)
      this.$dispatch(rowsResizeAC(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }
  async resizeTableCol($target, $parent, coords, context) {
    try {
      const data = await colResize($target, $parent, coords, context)
      this.$dispatch(colsResizeAC(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    const $target = $(event.target)
    const $parent = $target.closest('[data-type="resize"]')
    const coords = $parent.getCoords()

    if (isCell(event)) {
      if (event.shiftKey) {
        const lastClick = this.lastTarget.data.id.split(':')
        const newClick = $target.data.id.split(':')

        const [lastRow, lastCol] = lastClick
        const [newRow, newCol] = newClick

        const context = this

        const selectedCells = shiftUpCellSelect(lastRow, lastCol, newRow, newCol, context)

        this.selection.selectGroup(selectedCells, $target)
      } else {
        this.selection.select($target)
        this.lastTarget = $target
        this.$dispatch({ type: 'TEST' })
      }
    }

    if (event.target.dataset.resize === 'row') {
      // rowResize($target, $parent, coords)
      this.resizeTableRow($target, $parent, coords)
    }
    if (event.target.dataset.resize === 'col') {
      const context = this
      // colResize($target, $parent, coords, context)
      this.resizeTableCol($target, $parent, coords, context)
    }
  }

  onKeydown(event) {
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!')
    const $target = $(event.target)
    const newClick = $target.data.id.split(':')
    let [newRow, newCol] = newClick
    newRow = +newRow
    newCol = +newCol
    const context = this

    keyDownLogic($target, event, context, newRow, newCol)
  }

  onKeyup(event) {
    this.$emit('table:input', event.target.textContent.trim())
    const $target = $(event.target)
    this.lastTarget = $target
  }

  onInput(event) {
    this.$emit('table:input', event.target.textContent.trim())
  }

  onClick(event) {
    this.$emit('table:input', event.target.textContent.trim())
  }
}
