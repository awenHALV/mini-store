import {createStore} from './store';

const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    addCount(state) {
      state.count++;
    }
  }
});

export {
  store
};