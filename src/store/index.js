import { createStore } from 'vuex';

export default createStore({
  state: {
    showCart: false,
  },
  mutations: {
    toggleShowCart(state, payload) {
      state.showCart = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
