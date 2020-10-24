
import { createToolBar } from './toolbar.template'
import { $ } from '@core/dom'
import { ExcelStateComponent } from '../../core/ExcelStateComponent'
import { defaultStyles } from '../../stylesConstants'
import { changeStylesAC } from '../../redux/actions'

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

  init() {
    super.init()
    this.$subscribe((state) => {
      this.setState(state.currentStyles)
    })
  }

  prepare() {
    this.initState(defaultStyles)
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
      this.$emit('toolbar:applyStyle', value)
      this.$dispatch(changeStylesAC(value))
    }
  }
}
