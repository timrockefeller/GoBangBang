<template>
  <div id="home">
    <h1 class="title">{{config.title}}</h1>
    <span v-if="isThinking">思考中...</span>
    <Board @set='set'></Board>
    <Strategy @gameStart='gameStart'></Strategy>
  </div>
</template>

<script>
import Board from './sub/Board'
import Strategy from './sub/Strategy'

import {mapState} from 'vuex'

import * as STATUS from '@/utils/status.js'
import * as ROLES from '@/utils/roles.js'
import {
  SET_STATUS,
  ADD_STEP,
  GAME_START,
  GAME_READY,
  GAME_TURN
} from '@/store/mutations.js'

export default {
  name: 'main-page',
  components: {Board, Strategy},
  data () { return {_pMount: 1} },
  computed: {
    config () {
      return this.$store.state.Config
    },
    status () {
      let status_ = this.$store.state.Config.status
      if (status_ === STATUS.THINKING) {
        let that = this
        new Promise(function (resolve, reject) {
          if (that._pMount > 0) {
            that._pMount--// P
            resolve(that.$Next())
          }
        }).then(function ({position, role}) {
          if (that.$store.state.Config.status === STATUS.THINKING) {
            that._set(position, role)
            that.$store.dispatch(GAME_TURN)
          }
          that._pMount++// V
        })
      }
      return status_
    },
    isThinking () {
      return this.status === STATUS.THINKING
    },
    ...mapState({
      board: state => state.Map.board
    })
  },
  methods: {
    _set: function (p, r) {
      console.log(p)
      this.$store.dispatch(ADD_STEP, {position: p, role: r})
    },
    set: function (position) {
      if (this.status === STATUS.PLAYING) {
        this._set(position, ROLES.PLAYER)
        this.$store.dispatch(GAME_TURN)
        // TODO: 调用AI计算开始
        console.log('[STATUS] ' + this.status)// TODO: 在dom里调用status来代替这里的更新
      }
    },
    gameStart: function () {
      this.$store.dispatch(GAME_START)
      console.log('[STATUS]' + this.status)
    }
  },
  created () {
    this.$store.dispatch(SET_STATUS, STATUS.LOADING)
    // load sth
    this.$store.dispatch(GAME_READY)
  }
}
</script>

<style>
  
</style>
