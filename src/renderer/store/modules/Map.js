import {
  SET_BOARD,
  SET_STEPS,
  RESET_BOARD,
  ADD_STEP,
  BACKWARD,
  FORWARD
} from '../mutations.js'

const emptyBoard = () => {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
}

const copyBoard = a => a.map(r => r.slice()).slice()

const state = {
  board: emptyBoard(),
  steps: [
    /*
    {
        position: [7,7],
        role: 1
    }
    */
  ],
  stepsTail: [],
  fives: []
}

const mutations = {
  [RESET_BOARD] (state) {
    state.board = emptyBoard()
    state.step = []
  },
  [SET_BOARD] (state, board) {
    state.board = board
  },
  [SET_STEPS] (state, steps) {
    state.steps = steps
  },
  [ADD_STEP] (state, {position, role}) {
    // state.position = position
    // state.role = role
    let newBoard = copyBoard(state.board)
    newBoard[position[0]][position[1]] = role
    state.board = newBoard
    const step = {
      position: position,
      role: role
    }
    state.steps.push(step)
    state.stepsTail = []// TODO : 找一个更好的清空方法
  },
  [BACKWARD] (state, steps) {

  },
  [FORWARD] (state, steps) {

  }
}

const actions = {
  [RESET_BOARD] ({commit}) {
    commit(RESET_BOARD)
  },
  [SET_BOARD] ({commit}, board) {
    commit(SET_BOARD, board)
  },
  [SET_STEPS] ({commit}, steps) {
    commit(SET_STEPS, steps)
  },
  [ADD_STEP] ({ commit }, c) {
    commit(ADD_STEP, c)
  }
}

export default {
  state,
  mutations,
  actions
}
