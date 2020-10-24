import { storage } from '@core/utils'
import { defaultStyles } from '../stylesConstants'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {}, // Сохраняем значения в ячейках
  currentText: '',
  currentStyles: defaultStyles,
  dataStyles: {},
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
