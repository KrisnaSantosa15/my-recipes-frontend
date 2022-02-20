import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("auth") || null,
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem("auth", token);
      state.token = token;
    },
    clearToken(state) {
      localStorage.removeItem("auth");
      state.token = null;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
	clearToken({ commit }) {
	  commit("clearToken");
	}
  },
  modules: {},
});
