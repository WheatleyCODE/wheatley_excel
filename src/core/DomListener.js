export class DomListener {
  // Тут будет
  // 0) Какие либо общие методы для всех-всех потомков
  // 1) Добавление прослушек событий
  // 2) Удаление прослушек событий


  constructor($root) {
    if (!$root) {
      throw new Error('No $root provided for DomListner')
    }
    // Элемент на который в будущем будем вешать прослушку событий
    this.$root = $root
    // console.log(this.$root)
  }
}
