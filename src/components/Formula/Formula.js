import { Component } from '@core/Component'

export class Formula extends Component {
  // Компонент Формулы
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options,
    })

    this.$on('table:input', (textContent) => {
      const root = $root.find('.input')
      root.text(textContent)
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$subscribe((state) => {
      console.log('FormulaState', state)
    })
  }

  onKeydown(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault()
      this.$emit('formula:enter')
    }
  }
  onInput(event) {
    const text = event.target.textContent.trim()
    this.$emit('formula:input', text)
  }

  onClick(event) {
    // console.log('Click Formula', event)
  }
}
