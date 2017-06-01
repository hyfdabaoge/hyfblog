import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: false,
    activeName: 'first'
  },
  actions,
  mutations
})

export default store
