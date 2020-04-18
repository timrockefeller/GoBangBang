<template>
  <div id="home">
    <h1 class="title">{{config.title}}</h1>
    <Board @set='set'></Board>
  </div>
</template>

<script>
import Board from 'sub/Board'
import {mapState} from 'vuex'
import * as STATUS from '@/status.js'
import {
  ADD_STEP
} from '@/store/mutations.js'

export default {
  name: 'main-page',
  components: {Board},
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

      }
    }
  }
}
</script>

<style>
  
</style>
