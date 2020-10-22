import { storage } from '@core/utils'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {}, // Сохраняем значения в ячейках
  currentText: '',
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
