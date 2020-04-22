import * as STATUS from '@/utils/status.js'
import * as ROLES from '@/utils/roles.js'
import {
  SET_STATUS,
  SET_FIRST,
  GAME_READY,
  GAME_START,
  GAME_TURN
} from '../mutations.js'

const state = {
  title: 'Go邦邦',
  showSteps: true,
  first: ROLES.PLAYER,
  status: STATUS.READY,
  options: {
    method: [],
    depth: 3
  }
}

const mutations = {
  [SET_STATUS]: function (state, status) {
    state.status = status
  },
  [SET_FIRST]: function (state) {
    if (state.status === STATUS.READY || state.status === STATUS.CLEANING) {
      if (state.first === ROLES.PLAYER) {
        state.first = ROLES.CONSOLE
      } else if (state.first === ROLES.CONSOLE) {
        state.first = ROLES.PLAYER
      }
      console.log('[Config] Switch first to ' + ['empty', 'player', 'console'][state.first])
    }
  },
  [GAME_READY]: function (state) {
    if (state.status === STATUS.LOADING) {
      console.log('[STATUS] Game Ready')
      state.status = STATUS.READY
    }
  },
  [GAME_START]: function (state) {
    if (state.status === STATUS.READY) {
      console.log('[STATUS] Game Start')
      // 游戏开始时检测配置中哪一方先落子
      if (state.first === ROLES.PLAYER) {
        state.status = STATUS.PLAYING
      } else if (state.first === ROLES.CONSOLE) {
        state.status = STATUS.THINKING
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
  [SET_STATUS]: function ({ commit }, s) {
    commit(SET_STATUS, s)
  },
  [GAME_READY]: function ({ commit }) {
    console.log('action logged')

    commit(GAME_READY)
  },
  [GAME_START]: function ({ commit }) {
    commit(GAME_START)
  },
  [GAME_TURN]: function ({ commit }) {
    commit(GAME_TURN)
  },
  [SET_FIRST]: function ({ commit }) {
    commit(SET_FIRST)
  }
}

export default {
  state,
  mutations,
  actions
}
