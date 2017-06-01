import {SET_TOKEN, USER_LOGOUT} from './mutationType'
export default {
  // SET_CLASSIFY: (state, classify) => {
  //   state.classify = classify
  // },
  [SET_TOKEN] (state, token) {
    localStorage.setItem('token', token)
    state.token = token
  },
  [USER_LOGOUT] (state) {
    localStorage.removeItem('token')
    state.token = false
  }
}
