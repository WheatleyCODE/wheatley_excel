export class Excel {
  // Компонент хранящий/отображающий другие компоненты
  // Общая логика для всех компонентов Excel
  constructor(selector, option) {
    // Получаем наш коревой элемент
    this.$el = document.querySelector(selector)
    // Получаем массив всех компонентов для отображения
    this.components = option.components || []
  }

  getRoot() {
    // Создаём корневой элемент
    const $root = document.createElement('div')
    $root.className = 'root'

    // Пробегаемся по нашим классам >> превращаем их в инстансы
    // >> добавляем их шаблоны в корневой элемент
    this.components.forEach((Component) => {
      const component = new Component()
      $root.insertAdjacentHTML('afterbegin', component.toHTML())
    });
    return $root
  }

  render() {
    // Добавляем корневой элемент с шаблонами в наш <div id="app"></div>
    console.log(this.$el)
    this.$el.append(this.getRoot())
    console.log(this.$el)
  }
}
