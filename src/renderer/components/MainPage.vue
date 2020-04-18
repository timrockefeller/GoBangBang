<template>
  <div id="home">
    <h1 class="title">{{config.title}}</h1>
    <Board @set='set'></Board>
    <Strategy ></Strategy>
  </div>
</template>

<script>
import Board from 'sub/Board'
import Strategy from 'sub/Strategy'

import {mapState} from 'vuex'

import * as STATUS from '@/utils/status.js'
import {
  ADD_STEP,
  SET_STATE
} from '@/store/mutations.js'

export default {
  name: 'main-page',
  components: {Board, Strategy},
  computed: {
    config () {
      return this.$store.state.Config
    },
    ...mapState({
      state: state => state.Config.state
    })
  },
  methods: {
    _set: function (p, r) {
      this.$store.dispatch([ADD_STEP], p, r)
    },
    set: function (position) {
      if (this.state === STATUS.PLAYING) {
        this.$store.dispatch([SET_STATE])
      }
    }
  }
}
</script>

<style>
  
</style>
