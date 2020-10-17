import { Component } from '@core/Component'

export class Formula extends Component {
  // Компонент Формулы
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    // console.log(this.$root)
    // console.log('onInput Formula', event.target.textContent.trim())
    const text = event.target.textContent.trim()
    this.emitter.emit('it is working', text)
  }

  onClick(event) {
    console.log('Click Formula', event)
  }
}
