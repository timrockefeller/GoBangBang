import * as STATUS from '@/utils/status.js'
import * as ROLES from '@/utils/roles.js'
import {
  SET_STATUS,
  GAME_START
} from '../mutations.js'

const state = {
  title: 'Go邦邦',
  showSteps: true,
  first: ROLES.PLAYER,
  status: STATUS.LOADING
}

const mutations = {
  [SET_STATUS]: function (state, status) {
    state.status = status
  }
}

const actions = {
  [GAME_START]: function ({ commit }) {

  }
}

export default {
  state,
  mutations,
  actions
}
