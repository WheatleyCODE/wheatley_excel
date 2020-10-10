import { Component } from '@core/Component'

export class Footer extends Component {
  // Компонент футер
  static className = 'excel__footer' // На футер нет стилей !!!


  toHTML() {
    return `<h1>Footer</h1>`
  }
}
