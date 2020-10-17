// Тут будут функции помогающие работать с ДОМ элементами
// Свой jQuery => WheatleyJQuery => WjQuery

class Dom {
  constructor(selector) {
    // Проверяем что такое селектор строка или элемент => запихиваем в this.$el
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    // Метод внедряющий html в елемент
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      // ↓ Возвращаем Dom для возможности чейнить методы (Один из паттернов JS)
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    this.$el.textContent = text
  }

  clear() {
    this.html('')
    // ↓ Возвращаем Dom для возможности чейнить методы (Один из паттернов JS)
    return this
  }

  // Дублирование AddEventListener
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  // Дублирование removeEventListener
  off(eventType, callback) {
    console.log(eventType, callback)
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  addClass(className) {
    this.$el.classList.add(className)
  }
  focus() {
    this.$el.focus()
  }
  removeClass(className) {
    this.$el.classList.remove(className)
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key]
    })
    return this.$el
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  // ↓ Оборачиваем результат для возможности чейнить методы
  return $(el)
}
