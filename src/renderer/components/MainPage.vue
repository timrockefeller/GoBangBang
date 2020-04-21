<template>
  <div id="home">
    <h1 class="title">{{config.title}}</h1>
    <Board @set='set'></Board>
    <Strategy ></Strategy>
  </div>
</template>

<script>
import Board from './sub/Board'
import Strategy from './sub/Strategy'

import {mapState} from 'vuex'

import * as STATUS from '@/utils/status.js'
import * as ROLES from '@/utils/roles.js'
import {
  ADD_STEP,
  GAME_READY,
  GAME_TURN
} from '@/store/mutations.js'

export default {
  name: 'main-page',
  components: {Board, Strategy},
  computed: {
    config () {
      return this.$store.state.Config
    },
    ...mapState({
      status: state => state.Config.status
    })
  },
  methods: {
    _set: function (p, r) {
      this.$store.dispatch([ADD_STEP], p, r)
    },
    set: function (position) {
      if (this.status === STATUS.PLAYING) {
        this._set(position, ROLES.PLAYER)
        this.$store.dispatch([GAME_TURN])
        // TODO: 调用AI计算开始
      }
    }
  },
  created () {
    this.$store.dispatch([GAME_READY])
  }
}
</script>

<style>
  
</style>
