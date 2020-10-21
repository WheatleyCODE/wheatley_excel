import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'

export class Excel {
  // Компонент хранящий/отображающий другие компоненты
  // Общая логика для всех компонентов Excel
  constructor(selector, option) {
    // Получаем наш коревой элемент
    this.$el = $(selector)
    // Получаем массив всех компонентов для отображения
    this.components = option.components || []

    // Некий хук который будет вызываться до рендера таблицы
    // (Вспоминаем реакт =D )

    this.store = option.store
    this.emitter = new Emitter
  }

  getRoot() {
    // Создаём корневой элемент
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }

    // Пробегаемся по нашим классам >> превращаем их в инстансы
    // >> добавляем их шаблоны в корневой элемент
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)

      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    });
    return $root
  }

  render() {
    // Добавляем корневой элемент с шаблонами в наш <div id="app"></div>
    console.log(this.$el)
    this.$el.append(this.getRoot())
    console.log(this.$el)
    console.log(this.components)

    this.components.forEach((component) => component.init())
    // this.components.forEach((component) => component.destroy())
  }

  destroy() {
    this.components.forEach((components) => components.destroy())
  }
}
