import { CHANGE_TEXT, COLS_RESIZE, ROWS_RESIZE } from './constants'

export function rootReducer(state, action) {
  switch (action.type) {
    case COLS_RESIZE: {
      const prevState = state.colState || {}
      prevState[action.cols.id] = action.cols.value
      return {
        ...state,
        colState: prevState, // id value
      }
    }
    case ROWS_RESIZE: {
      const prevState = state.rowState || {}
      prevState[action.rows.id] = action.rows.value
      return {
        ...state,
        rowState: prevState,
      }
    }
    case CHANGE_TEXT: {
      const prevState = state['dataState'] || {}
      // action.data.text !== ''
      //   ? prevState[action.data.id] = action.data.text
      //   : null
      prevState[action.data.id] = action.data.text
      return {
        ...state,
        currentText: action.data.text,
        dataState: prevState,
      }
    }
    default: return state
  }
}
