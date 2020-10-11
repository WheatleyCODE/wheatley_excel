import { Component } from '@core/Component'
import { createTable } from './table.template'

export class Table extends Component {
  // Компонент Таблицы
  static className = 'excel__table'


  toHTML() {
    return createTable(35)
  }
}
