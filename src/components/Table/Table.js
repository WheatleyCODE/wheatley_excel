import { Component } from '@core/Component'
import { createTable } from './table.template'
import { $ } from '@core/dom'
import { rowResize, colResize } from './table.resize'

export class Table extends Component {
  // Компонент Таблицы
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable(35)
  }

  onMousedown(event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resize"]')
    const coords = $parent.getCoords()

    if (event.target.dataset.resize === 'row') {
      rowResize($resizer, $parent, coords)
    }
    if (event.target.dataset.resize === 'col') {
      const context = this
      colResize($resizer, $parent, coords, context)
    }
  }
}
