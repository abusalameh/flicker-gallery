import { http } from '@/services'
// initial state
export const state = {
  errors: [],
  data_object: {},
  cached: [],
}

// getters
export const getters = {
}

// actions
export const actions = {
  /**
   * Load images from flicker API
   * @param {Object} params 
   */
  async load({ commit }, params) {
    commit('CLEAR_ERRORS')
    const defaultParams = {
      format: 'json',
      nojsoncallback: 1,
    }
    params = Object.assign(params, defaultParams);
    // params.format = 'json';
    // params.nojsoncallback = 1
    await (http.get('', { params }).then((response) => {
      const { data } = response;
      commit('SET_IMAGES', data)
    }).catch((error) => {
      commit('SET_ERRORS', error)
    }))
  },
  /**
   * Load more images from flicker API
   * @param {Object} params
   */
  async loadMore({ commit }, params) {
    commit('CLEAR_ERRORS')
    const defaultParams = {
      format: 'json',
      nojsoncallback: 1,
    }
    params = Object.assign(params, defaultParams);
    await (http.get('', { params }).then((response) => {
      const { data } = response;
      commit('SET_NEW_IMAGES', data)
    }).catch((error) => {
      commit('SET_ERRORS', error)
    }))

  },

  /**
   * Delete image from the cached list by index 
   * @param {*} index 
   */
  deleteImage({ commit }, index) {
    let list = _.cloneDeep(state.cached);
    list.splice(index, 1);
    state.cached = _.cloneDeep(list);
  },


  drag({ commit }, data) {
    commit('SET_DRAGGED_IMAGES', data)
  }
}

// mutations
export const mutations = {
  /**
   * Clear Errors if any
   * @param {*} state 
   * @param {*} data 
   */
  ['CLEAR_ERRORS'](state, data) {
    state.errors = [];
  },

  /**
   * Set images data and list to the state 
   * @param {*} state 
   * @param {*} data 
   */
  ['SET_IMAGES'](state, data) {
    state.data_object = Object.assign({}, data.photos || null);
    state.cached = data.photos.photo;
  },

  /**
   * Set new loaded images to the cached list
   * @param {*} state 
   * @param {*} data 
   */
  ['SET_NEW_IMAGES'](state, data) {

    const append = data.photos.photo;
    state.cached = _.uniqBy(_.concat(state.cached, append), 'id');
  },

  /**
   * Set image list with the new order after drag and drop
   * @param {*} state 
   * @param {*} data 
   */
  ['SET_DRAGGED_IMAGES'](state, data) {
    state.cached = _.cloneDeep(data);
  },

  /**
   * Set errors if any
   * @param {*} state 
   * @param {*} errors 
   */
  ['SET_ERRORS'](state, errors) {
    state.errors = errors;
  },
}
