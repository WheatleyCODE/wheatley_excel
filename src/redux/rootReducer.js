import { COLS_RESIZE, ROWS_RESIZE } from './constants'

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
    default: return state
  }
}
