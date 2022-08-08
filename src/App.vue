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
html,
body {
  min-width: 100% !important;
  background: linear-gradient(135deg, #f1458e 50%, #f0415a);
}
#app {
  display: flex;
  justify-content: center;
  text-align: center;
}
#zmmtg-root {
  display: none;
}
</style>
