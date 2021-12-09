<template>
  <div class="game-area" @keypress.self="console.log('dfsdg')">
    <Figure
      v-for="info in fallingFigures"
      :key="info.id"
      :id="info.id"
      :color="info.color"
      :positionX="info.positionX"
      :positionY="info.positionY"
      :weight="info.weight"
      :shape="info.shape"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Figure from "@/components/Figure";

export default {
  name: "GameArea",
  components: {
    Figure,
  },
  data() {
    return {
      fallingTimer: null,
    };
  },
  mounted() {
    window.addEventListener("keydown", this.moveShape);
  },
  computed: {
    ...mapState(["fallingFigures", "isGamePaused"]),
    ...mapGetters([
      "getBoardAngle",
      "getBoardRotateHeight",
      "isBoardAngleWithinLimits",
    ]),

    getFallingFigure() {
      return this.fallingFigures[1].positionY;
    },
  },
  watch: {
    isGamePaused: {
      handler(currentState) {
        if (currentState) {
          clearInterval(this.fallingTimer);
        } else {
          this.startDroppingShapes();
        }
      },
    },
    getFallingFigure(newCount) {
      console.log("ANGLE", this.getBoardAngle);
      console.log("FASD", this.getBoardRotateHeight);
      if (newCount === this.getBoardRotateHeight) {
        this.moveFallingShapeToDropped();
      }
    },
    isBoardAngleWithinLimits(newCount) {
      if (!this.isGamePaused && !newCount) {
        setTimeout(() => {
          alert("Game Over");
        }, 0);
        this.initGame();
      }
    },
  },
  methods: {
    ...mapMutations(["dropCurrentShape", "moveFallingShape"]),
    ...mapActions(["moveFallingShapeToDropped", "initGame"]),

    startDroppingShapes() {
      this.fallingTimer = setInterval(() => {
        this.dropCurrentShape();
      }, 10);
    },

    moveShape({ code }) {
      this.moveFallingShape(code);
    },
  },
};
</script>

<style scoped lang="sass">
.game-area
  position: relative
  height: 500px
</style>
