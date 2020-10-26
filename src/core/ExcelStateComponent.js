import { Component } from '@core/Component'

export class ExcelStateComponent extends Component {
  constructor(...args) {
    super(...args)
  }

  initState(initialState = {}) {
    this.state = { ...initialState }
  }

  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.$root.html(this.template)
  }
}
