
export const state = () => ({
  now: null,
  reqs: null
})

export const getters = {
  getCounter (state) {
    return state.now
  },
  getCounterReqs (state) {
    return state.reqs
  }
}

export const mutations = {
  UPDATE_TIME (state, data) {
    state.now = data.usersPermissionsUsers.meta.pagination.total
  },
  UPDATE_REQS (state, data) {
    state.reqs = data.zaprosyVrachejs.meta.pagination.total
  }
}

export const actions = {
  start ({ commit }) {
    setInterval(() => {
      let client = this.app.apolloProvider.defaultClient
        .query({
          query: ALL_VRACHI_STAT,
          fetchPolicy: 'network-only'
        })
        .then(({ data }) => {
          commit('UPDATE_TIME', data)
        })
    }, 5000)
  },
  startReqs ({ commit }) {
    setInterval(() => {
      let client = this.app.apolloProvider.defaultClient
        .query({
          query: ALL_REQS_STAT,
          fetchPolicy: 'network-only'
        })
        .then(({ data }) => {
          commit('UPDATE_REQS', data)
        })
    }, 2000)
  }
}
