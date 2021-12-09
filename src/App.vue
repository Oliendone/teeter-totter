<template>
  <InfoPanel />
  <Playground />
</template>

<script>
import Playground from "@/components/Playground";
import InfoPanel from "@/components/InfoPanel";
export default {
  name: "App",
  components: {
    InfoPanel,
    Playground
  },
};
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
</style>
