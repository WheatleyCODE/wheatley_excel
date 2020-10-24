
import { createToolBar } from './toolbar.template'
import { $ } from '@core/dom'
import { ExcelStateComponent } from '../../core/ExcelStateComponent'

export class Toolbar extends ExcelStateComponent {
  // Компонент Панели инструментов
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'ToolBar',
      listeners: ['click'],
      ...options,
    })
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal',
    }
    this.initState(initialState)
  }

  get template() {
    return createToolBar(this.state)
  }

  toHTML() {
    return createToolBar(this.state)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      const key = Object.keys(value)[0]
      this.setState({ [key]: value[key] })
      console.log(this.state)
    }
  }
}
