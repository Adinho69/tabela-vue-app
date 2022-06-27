import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ligas: Array,
  },
  getters: {},
  mutations: {
    getLeagues(state, payload) {
      state.ligas = payload;
    },
  },
  actions: {
    getLigas(context, payload) {
      context.commit('getLeagues', payload);
    },
  },
  modules: {},
});
