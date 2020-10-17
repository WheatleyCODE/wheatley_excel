import { DomListener } from './DomListener';

export class Component extends DomListener {
  // Тут будет
  // Общие значения и методы для всех компонентов

  constructor($root, option = {}) {
    super($root, option.listeners)
    this.name = option.name

    this.emitter = option.emitter

    console.log(this.emitter)

    this.prepare()
  }

  prepare() {
    // Вспомогательная логика
  }

  // метод возвращающий шаблон для компонентов
  toHtml() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
