import Vue from "vue";
import Vuex from "vuex";
import * as home from "@/store/modules/Home.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home
  },
  state: {},
  mutations: {},
  actions: {}
});
