<template>
  <div id="app">
    <Zoom />
  </div>
</template>

<script>
import Zoom from "./components/Zoom.vue";

export default {
  name: "App",
  components: {
    Zoom,
  },
};
</script>

<style>
body,
html {
  min-width: 100%;
  background: linear-gradient(135deg, #f1458e 50%, #f0415a);
}
#app {
  width: 70%;
  margin: auto;
  text-align: center;
}
#zmmtg-root {
  display: none;
}
</style>
