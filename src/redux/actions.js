import { CHANGE_TEXT, COLS_RESIZE, ROWS_RESIZE, CHANGE_STYLES, APPLY_STYLE } from './constants';

export function colsResizeAC(data) {
  return {
    type: COLS_RESIZE,
    cols: data,
  }
}

export function rowsResizeAC(data) {
  return {
    type: ROWS_RESIZE,
    rows: data,
  }
}

export function changeTextAC(data) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}
export function changeStylesAC(data) {
  return {
    type: CHANGE_STYLES,
    data,
  }
}
export function applyStylesAC(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}

