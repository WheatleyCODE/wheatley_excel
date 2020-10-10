export class Excel {
  // Компонент хранящий/отображающий другие компоненты
  // Общая логика для всех компонентов Excel
  constructor(selector, option) {
    // Получаем наш коревой элемент
    this.$el = document.querySelector(selector)
    // Получаем массив всех компонентов для отображения
    this.components = option.components || []
  }
}
