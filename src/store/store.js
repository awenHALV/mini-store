import { reactive, inject} from 'vue';
const STORE_KEY = '__store';

function useStore() {
  return inject(STORE_KEY);
}
function createStore(options) {
  return new Store(options);
}
class Store {
  // options里有state,mutations,actions,getters等
  constructor(options) {
    this.$options = options;
    // 此时，需要将state包裹为响应式，此时的_state是一个proxy
    this._state = reactive({
      data: options.state()
    });
   
    this._mutations = options.mutations;
  }

  get state() {
    return this._state.data;
  }

  // store需要提供 commit 方法，实际就是调用内部的mutation
  /**
   * @param string type 方法名
   * @param Object|string payload 实际值
   */
  commit = (type, payload) => {
    const event = this._mutations[type];
    // 这里注意，需要将get中已经解开的state返回，而不是_state
    event && event(this.state, payload);
  }

  // 提供依赖，inject的组件可以使用
  // 作为插件必须有此方法，才能使用use(store)
  install = app => {
    console.log(app)
    app.provide(STORE_KEY, this);
  }
}

export {createStore, useStore};