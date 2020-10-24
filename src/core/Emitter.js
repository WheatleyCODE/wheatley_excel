// Он же обсервер паттерн
export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // table.emit('table:select', cell)
  emit(eventName, ...args) {
    // Уведомляем слушателей если они есть
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach((listener) => {
      listener(...args)
    })

    return true
  }

  // formula.subscribe('table:select, () => {}')
  subscribe(eventName, fn) {
    // Подписываем слушателей на изменения
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)

    return () => {
      this.listeners[eventName] = this.listeners[eventName]
          .filter((listener) => listener !== fn)
    }
  }
}
