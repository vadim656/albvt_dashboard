import gql from 'graphql-tag'

const ALL_VRACHI_STAT = gql`
  query ALL_VRACHI_STAT {
    usersPermissionsUsers(filters: { RoleUser: { eq: "Vrach" } }) {
      meta {
        pagination {
          total
        }
      }
    }
  }
`

export const state = () => ({
  now: null
})

export const getters = {
  getCounter (state) {
    return state.now
  }
}

export const mutations = {
  UPDATE_TIME (state, data) {
    state.now = data.usersPermissionsUsers.meta.pagination.total
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
          console.log(data)
        })
    }, 2000)
  }
}
