import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      modal: null,
      show: false,
      token: null,
      action: null,
      goto: null,
      log: null,
    }
  },
  getters: {
    actionColumns (state) {
      if (state.action === null) return []
      return [
        { title: '', key: 'index', width: 60, fixed: 'left' },
        ...Object.keys(state.action[0]).map((v) => ({ title: v, key: v, width: 60 })),
      ]
    },
    actionData (state) {
      if (state.action === null) return []
      return state.action.map((v, i) => Object.assign({}, v, { index: i }))
    },
    gotoColumns (state) {
      if (state.goto === null) return []
      return [
        { title: '', key: 'index', width: 60, fixed: 'left' },
        ...Object.keys(state.goto[0]).map((v) => ({ title: v, key: v, width: 60 })),
      ]
    },
    gotoData (state) {
      if (state.goto === null) return []
      return state.goto.map((v, i) => Object.assign({}, v, { index: i }))
    },
  }

})
