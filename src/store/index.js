import { createStore } from 'vuex';

export default createStore({
  state: {
    showCart: true,
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
