import { COLS_RESIZE, ROWS_RESIZE } from './constants';

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
