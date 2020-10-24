import { Component } from '@core/Component'
import { changeTableNameAC } from '../../redux/actions'
import { storage } from '@core/utils'
import { defaultTableName } from '../../stylesConstants'


export class Header extends Component {
  // Компонент хедер
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }
  onInput(event) {
    console.log('input')
    this.$dispatch(changeTableNameAC(event.target.value))
  }
  toHTML() {
    const table = storage('excel-state')
    return `
      <input type="text" class="input" value="${table?.tableName || defaultTableName}" />
        <div>
          <div class="button">
            <i class="material-icons">delete</i>
          </div>

          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>
    `
  }
}
