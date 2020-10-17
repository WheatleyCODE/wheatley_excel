import { Component } from '@core/Component'
import { createTable } from './table.template'
import { $ } from '@core/dom'
import { rowResize, colResize } from './table.resize'
import { TableSelection } from './TableSelection'
import { isCell, keyDownLogic, shiftUpCellSelect } from './table.functions'

export class Table extends Component {
  // Компонент Таблицы
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
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

    this.emitter.subscribe('it is working', (text) => {
      console.log( this.lastTarget)
      this.lastTarget.text(text)
    })
  }

  toHTML() {
    return createTable(25)
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
      }
    }

    if (event.target.dataset.resize === 'row') {
      rowResize($target, $parent, coords)
    }
    if (event.target.dataset.resize === 'col') {
      const context = this
      colResize($target, $parent, coords, context)
    }
  }

  onKeydown(event) {
    const $target = $(event.target)
    const newClick = $target.data.id.split(':')
    let [newRow, newCol] = newClick
    newRow = +newRow
    newCol = +newCol
    const context = this

    keyDownLogic($target, event, context, newRow, newCol)
  }
}
