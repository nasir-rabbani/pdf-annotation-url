export const namespaced = true;

export const state = {
  test: 5,
  urls: []
};

export const mutations = {
  SAVE_URL(state, url) {
    state.urls.push(url);
  }
};

export const actions = {
  createUrl({ commit }, urlData) {
    commit("SAVE_URL", urlData);
  }
};
