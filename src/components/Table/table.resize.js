export function rowResize($resizer, $parent, coords) {
  return new Promise((res) => {
    $resizer.css({
      opacity: 1,
      zIndex: 1000,
    })
    let delta = 0
    document.onmousemove = (e) => {
      $resizer.$el.style.width = '100vw'
      delta = e.pageY - coords.y + 6
      $resizer.css({
        top: (delta - 6) + 'px',
      })
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      $resizer.$el.style.width = '38px'
      $parent.css({
        height: delta + 'px',
      })
      $resizer.css({
        opacity: 0,
      })
      res({
        id: $parent.data.row,
        value: delta,
      })
    }
  })
}

export function colResize($resizer, $parent, coords, context) {
  return new Promise((res) => {
    const cells = context.$root.findAll(`[data-col="${$parent.data.col}"]`)
    let delta = 0;
    $resizer.css({
      opacity: 1,
      zIndex: 1000,
    })
    document.onmousemove = (e) => {
      $resizer.$el.style.height = '100vh'
      delta = e.pageX - coords.x + 6
      $resizer.css({
        left: (delta - 6) + 'px',
      })
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      $resizer.$el.style.height = '24px'
      $parent.css({
        width: delta + 'px',
      })
      $resizer.css({
        opacity: 0,
      })
      cells.forEach((el) => {
        el.style.width = delta + 'px' //  Сделать оптимизацию
      })
      res({
        value: delta,
        id: $parent.data.col,
      })
    }
  })
}
