import { Component } from '@core/Component'
import { createTable } from './table.template'
import { $ } from '@core/dom'

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
    if (event.target.dataset.resize === 'row') {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resize"]')
      const coords = $parent.getCoords()
      document.onmousemove = (e) => {
        $resizer.$el.style.width = '100vw'
        const delta = e.pageY - coords.y + 4
        $parent.$el.style.height = delta + 'px'
      }
      document.onmouseup = () => {
        document.onmousemove = null
        $resizer.$el.style.width = '38px'
      }
    }
    if (event.target.dataset.resize === 'col') {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resize"]')
      const coords = $parent.getCoords()
      console.log($parent.data.col)
      document.onmousemove = (e) => {
        $resizer.$el.style.height = '100vh'
        const delta = e.pageX - coords.x + 4
        $parent.$el.style.width = delta + 'px'
        document.querySelectorAll(`[data-col="${$parent.data.col}"]`).forEach((el) => {
          el.style.width = delta + 'px' //  Сделать оптимизацию
        })
      }
      document.onmouseup = () => {
        document.onmousemove = null
        $resizer.$el.style.height = '24px'
      }
    }
  }
}
