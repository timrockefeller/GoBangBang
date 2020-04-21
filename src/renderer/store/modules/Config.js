import * as STATUS from '@/utils/status.js'
import * as ROLES from '@/utils/roles.js'
import {
  SET_STATUS,
  GAME_START,
  GAME_TURN
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
  },
  [GAME_START]: function (state) {
    if (state.status === STATUS.READY) {
      // 游戏开始时检测配置中哪一方先落子
      if (state.first === ROLES.PLAYER) {
        state.state = STATUS.PLAYING
      } else {
        state.state = STATUS.THINKING
        // TODO : 调用AI着手第一步，可在上层实现？
      }
    }
  },
  [GAME_TURN]: function (state) {
    if (state.status === STATUS.PLAYING) {
      state.status = STATUS.THINKING
    } else if (state.status === STATUS.THINKING) {
      state.status = STATUS.PLAYING
    }
  }
}

const actions = {
  [GAME_START]: function ({ commit }) {
    commit([GAME_START])
  },
  [GAME_TURN]: function ({ commit }) {
    commit([GAME_TURN])
  }
}

export default {
  state,
  mutations,
  actions
}
