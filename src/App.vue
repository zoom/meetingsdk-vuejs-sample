<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  width: 70%;
  margin: auto;
  text-align: center;
}
#zmmtg-root {
  display: none;
}
</style>
