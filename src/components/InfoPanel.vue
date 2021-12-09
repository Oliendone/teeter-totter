<template>
  <div class="info-panel">
    <div class="info-box">
      <span class="text"
        >Total Weight: {{ getTotalWeightOfDroppedFigures }}</span
      >
      <span class="text">Momentum: {{ getMomentumWeightOfFallingFigure }}</span>
    </div>
    <div class="controls">
      <button class="button button--start" @click="toggleGame">
        <span v-if="isGamePaused">Start</span>
        <span v-else>Pause</span>
      </button>
      <button class="button button--restart" @click="restartGame">
        Restart
      </button>
    </div>
    <div class="info-box">
      <span class="text"
        >Total Weight: {{ getTotalWeightOfRandomlyPlacedFigures }}</span
      >
      <span class="text"
        >Momentum: {{ getMomentumWeightOfRandomlyPlaced }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "InfoPanel",
  computed: {
    ...mapState(["isGamePaused"]),
    ...mapGetters([
      "getMomentumWeightOfRandomlyPlaced",
      "getMomentumWeightOfFallingFigure",
      "getTotalWeightOfRandomlyPlacedFigures",
      "getTotalWeightOfDroppedFigures",
    ]),
  },
  methods: {
    ...mapMutations(["toggleGameActivity"]),
    ...mapActions(["initGame"]),
    ...mapActions({ restartGame: "initGame", toggleGame: "toggleGame" }),
  },
  created() {
    this.initGame();
  },
};
</script>

<style scoped lang="sass">
.info-panel
  width: 1000px
  padding: 20px
  margin: 0 auto
  display: flex
  justify-content: space-between
  .info-box
    display: flex
    flex-direction: column
  .text
    font-size: 14px
    line-height: 18px
  .button
    padding: 10px 16px
    background-color: transparent
    border: 1px solid black
  .button + .button
    margin-left: 5px
</style>
