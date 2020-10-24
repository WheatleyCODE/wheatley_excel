import { storage } from '@core/utils'
import { defaultStyles, defaultTableName } from '../stylesConstants'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {}, // Сохраняем значения в ячейках
  currentText: '',
  currentStyles: defaultStyles,
  dataStyles: {},
  tableName: defaultTableName,
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
