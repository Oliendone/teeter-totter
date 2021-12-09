<template>
  <div class="teeter-totter">
    <div class="board" ref="board" :style="boardRotation">
      <!--      Left side of board (dropped figures)-->
      <Figure
        v-for="info in droppedFigures"
        :key="info.id"
        :id="info.id"
        :color="info.color"
        :positionX="info.positionX"
        :weight="info.weight"
        :shape="info.shape"
        on-board
      />
      <!--      Right side of board (randomly placed figures)-->
      <Figure
        v-for="info in randomlyPlacedFigures"
        :key="info.id"
        :id="info.id"
        :color="info.color"
        :positionX="info.positionX"
        :positionY="info.positionY"
        :weight="info.weight"
        :shape="info.shape"
        randomly-on-board
        on-board
      />
    </div>
    <div class="basement" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Figure from "@/components/Figure";

export default {
  name: "TeeterTotter",
  components: {
    Figure,
  },
  computed: {
    ...mapState(["randomlyPlacedFigures", "droppedFigures"]),
    ...mapGetters(["getBoardAngle"]),

    boardRotation() {
      return {
        transform : `rotate(${ this.getBoardAngle / 2 }deg)`,
      }
    }
  },
};
</script>

<style scoped lang="sass">
.teeter-totter
  display: flex
  flex-direction: column
  align-items: center
  .board
    width: 100%
    height: 6px
    background-color: #994C00
    position: relative
    transition: 300ms ease-in-out
  .basement
    width: 0
    height: 0
    border: 50px solid transparent
    border-top: 0
    border-bottom: 150px solid #646464
</style>
