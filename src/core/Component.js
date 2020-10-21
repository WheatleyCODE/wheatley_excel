import { DomListener } from './DomListener';

export class Component extends DomListener {
  // Тут будет
  // Общие значения и методы для всех компонентов

  constructor($root, option = {}) {
    super($root, option.listeners)
    this.name = option.name

    this.store = option.store
    this.emitter = option.emitter
    this.unsubscribers = [] // Отписки / Отписчики
    this.storeSub = null

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

  // Интерфейс позволяющий взаимодействовать с эмитором (Паттерн)
  // Уведомляем слушателей про событие eventName
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args)
  }

  // Подписываемся на событие eventName
  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
    this.store.unsubscribe()
  }
}
