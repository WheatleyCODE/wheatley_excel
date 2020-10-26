export function createStore(rootReducer, initialState = {}) {
  // Локальный стейт
  let state = rootReducer({ ...initialState }, { type: '__INIT__' })
  // Слушатели
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn)
        },
      }
    },
    dispatch(action) {
      // action = {type: 'darova'}
      state = rootReducer(state, action)
      listeners.forEach((listener) => listener(state))
    },
    getState() {
      return state
    },
  }
}
