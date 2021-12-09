<template>
  <div
    class="figure"
    :class="shape"
    :style="{
      top: `${positionY}px`,
      left: !randomlyOnBoard ? `${this.positionX}%` : '',
      right: randomlyOnBoard ? `${this.positionX}%` : '',
    }"
    :id="id"
  >
    <span class="weight">{{ weight }} kg</span>
  </div>
</template>

<script>
export default {
  name: "Figure",
  props: {
    id: {
      type: String,
      required: true,
    },
    randomlyOnBoard: {
      type: Boolean,
      default: false,
    },
    onBoard: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
    shape: {
      type: String,
    },
    weight: {
      type: Number,
    },
    positionX: {
      type: Number,
    },
    positionY: {
      type: Number,
    },
  },
  mounted() {
    this.setFigureStyles();
  },
  computed: {
    setPositionX() {
      if (this.randomlyOnBoard) {
        return {
          right: `${this.positionX}%`,
          transform: "translateX(50%)",
        };
      } else {
        return {
          left: `${this.positionX}%`,
          transform: "translateX(-50%)",
        };
      }
    },
  },
  methods: {
    setFigureStyles() {
      const { style } = this.$el;

      if (this.shape === "triangle") {
        style.borderBottomColor = this.color;
      } else {
        style.backgroundColor = this.color;
      }

      if (this.onBoard) {
        style.transform += "translateY(-100%)";
      }
    },
  },
};
</script>

<style scoped lang="sass">
.figure
  position: absolute
  display: flex
  align-items: center
  justify-content: center
  top: 0
.weight
  font-weight: bold
  color: white
.square
  width: 50px
  height: 50px
.circle
  width: 50px
  height: 50px
  border-radius: 50%
.triangle
  width: 0
  height: 0
  border-left: 40px solid transparent
  border-right: 40px solid transparent
  border-bottom: 50px solid
  span
    position: absolute
    top: 25px
    width: 100%
    white-space: nowrap
    transform: translate(-20px)
</style>
