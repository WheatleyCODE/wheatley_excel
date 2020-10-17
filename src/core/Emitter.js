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

// Tests
// const emitter = new Emitter()
// const unsub = emitter.subscribe('dmitry', (data) => console.log('Sub', data))
// emitter.emit('dmitry', 42)
// emitter.emit('12345678', 42)

// setTimeout(() => {
//   emitter.emit('dmitry', 'after 2sec')
// }, 2000)

// setTimeout(() => {
//   // Отпписываемся
//   unsub()
// }, 3000)

// setTimeout(() => {
//   emitter.emit('dmitry', 'after 4sec')
// }, 4000)
