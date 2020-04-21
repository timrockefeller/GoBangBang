<template>
  <div>
      <el-switch
        :enabled="isReady"
        style="display: block"
        v-model="first"
        active-color="#13ce66"
        inactive-color="#4989ff"
        active-text="电脑先手"
        inactive-text="玩家先手">
      </el-switch>
      <el-button type="success" @click="gameStart" plain>开始游戏</el-button>
      <el-button  @click="debug" plain>debug</el-button>
  </div>
</template>

<script>

import {mapState} from 'vuex'

import {
  SET_FIRST,
  GAME_START
} from '@/store/mutations.js'
import * as ROLES from '@/utils/roles.js'
import * as STATUS from '@/utils/status.js'
export default {
  data () {
    return {

    }
  },
  computed: {
    first: {
      get () {
        return this.$store.state.Config.first === ROLES.CONSOLE
      },
      set (value) {
        this.$store.dispatch(SET_FIRST)
      }
    },
    ...mapState({
      status: state => state.Config.status
    }),
    isReady () {
      return this.status === STATUS.READY
    }
  },
  methods: {
    gameStart: function () {
      this.$store.dispatch(GAME_START)
    },
    debug: function () {
      console.log(this.$store.state.Config)
    }
  }
}
</script>

<style>

</style>
