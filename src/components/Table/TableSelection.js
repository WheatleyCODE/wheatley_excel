// import { $ } from '@core/dom'
export class TableSelection {
  // Класс для взаимодейсвия с html и css
  static className = 'selected'
  constructor() {
    this.group = []
  }
  // $el = инстанс класса Dom
  select($el) {
    // Выбор ячейки

    this.clear()
    $el.addClass(TableSelection.className)
    this.group.push(($el))
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className))
    this.group.forEach(($el) => $el.removeClass('selectedGroup'))
    this.group = []
  }

  selectGroup($elArr, $target) {
    this.clear()
    $elArr.forEach(($el) => {
      $el.addClass('selectedGroup')
    })
    $target.focus()
    $target.addClass(TableSelection.className)
    this.group = this.group.concat($elArr)
  }
}
