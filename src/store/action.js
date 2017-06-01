import router from '../router'
export default {
  UserLogin ({commit}, data) {
    commit('SET_TOKEN', data.token)
  },
  UserLogout ({commit}) {
    commit('USER_LOGOUT')
    router.push({path: '/'})
  }
}
