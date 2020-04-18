<template>
  <div id="wrapper">
    
  </div>
</template>

<script>
  export default {
    name: 'main-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  
</style>
