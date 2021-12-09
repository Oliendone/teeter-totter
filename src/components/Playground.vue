<template>
  <main class="playground">
    <GameArea />
    <TeeterTotter />
  </main>
</template>

<script>
import TeeterTotter from "@/components/TeeterTotter";
import GameArea from "@/components/GameArea";
export default {
  name: "Playground",
  components: {
    TeeterTotter,
    GameArea
  },
};
</script>

<style scoped lang="sass">
.playground
  width: 1000px
  margin: 0 auto
  display: flex
  flex-direction: column
</style>
