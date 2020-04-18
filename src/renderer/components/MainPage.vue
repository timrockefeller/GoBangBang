<template>
  <div id="home">
    <h1 class="title">{{config.title}}</h1>
    <Board @set='set'></Board>
  </div>
</template>

<script>
import Board from './sub/Board'
export default {
  name: 'main-page',
  components: {Board},
  computed: {
    config () {
      return this.$store.state.Config
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
  
</style>
