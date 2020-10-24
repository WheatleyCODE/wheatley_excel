import { Component } from '@core/Component'
import { createTable } from './table.template'
import { $ } from '@core/dom'
import { rowResize, colResize } from './table.resize'
import { TableSelection } from './TableSelection'
import { isCell, keyDownLogic, shiftUpCellSelect } from './table.keydown'
import { colsResizeAC, rowsResizeAC } from '@/redux/actions'
import { setUserTableStoradge } from './table.userTableStoradge'
import { changeTextAC } from '../../redux/actions'
import { defaultStyles } from '../../stylesConstants'

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

    // Проверяем есть ли что-то в сторадже если есть изменяем
    setUserTableStoradge(this.$root)

    const $defaultCell = this.$root.find('[data-id="0:0"]')
    this.lastTarget = $defaultCell
    this.selectCell($defaultCell, this.updateTextInStore.bind(this))

    this.$on('formula:input', (text) => {
      this.lastTarget.text(text)
      this.updateTextInStore(this.lastTarget, text)
    })

    this.$on('formula:enter', () => {
      this.lastTarget.focus()
    })

    this.$emit('table:input', $defaultCell.text())
    this.$subscribe((state) => {
      // console.log('TableState', state)
    })
    this.$on('toolbar:applyStyle', (style) => {
      console.log('tableStyle', style)
      this.selection.applyStyle(style)
    })
  }

  selectCell($cell, fn) {
    this.selection.select($cell, fn)
    console.log($cell.getStyle(Object.keys(defaultStyles)))
  }

  toHTML() {
    return createTable(20)
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
        this.selectCell($target)
        this.lastTarget = $target
      }
    }

    if (event.target.dataset.resize === 'row') {
      this.resizeTableRow($target, $parent, coords)
    }
    if (event.target.dataset.resize === 'col') {
      const context = this
      this.resizeTableCol($target, $parent, coords, context)
    }
  }

  updateTextInStore(target, text) {
    this.$dispatch(changeTextAC({
      id: target.data.id,
      text: text,
    }))
  }

  onKeydown(event) {
    const $target = $(event.target)
    const newClick = $target.data.id.split(':')
    let [newRow, newCol] = newClick
    newRow = +newRow
    newCol = +newCol
    const context = this

    keyDownLogic($target, event, context, newRow, newCol, this.updateTextInStore.bind(this))
  }

  onKeyup(event) {
    // this.$emit('table:input', event.target.textContent.trim())
    const $target = $(event.target)
    this.lastTarget = $target
  }

  onInput(event) {
    // this.$emit('table:input', event.target.textContent.trim())
    const $target = $(event.target)
    this.updateTextInStore($target, event.target.textContent.trim())
  }

  onClick(event) {
    // this.$emit('table:input', event.target.textContent.trim())
    const $target = $(event.target)
    if ($target.data.id) {
      this.updateTextInStore($target, event.target.textContent.trim())
    }
  }
}
