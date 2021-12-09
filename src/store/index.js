import { createStore } from "vuex";
import helpers from "@/utils/helpers";

export default createStore({
  state: {
    droppedFigures: [],
    fallingFigures: [],
    randomlyPlacedFigures: [],
    isGamePaused: true,
  },
  getters: {
    getTotalWeightOfRandomlyPlacedFigures(state) {
      if (state.randomlyPlacedFigures.length === 1) {
        return state.randomlyPlacedFigures[0].weight;
      }
      return state.randomlyPlacedFigures.reduce(
        (prevVal, currentVal) => prevVal + currentVal.weight,
        0
      );
    },

    getTotalWeightOfDroppedFigures(state) {
      if (state.droppedFigures.length === 0) {
        return 0;
      }
      if (state.droppedFigures.length === 1) {
        return state.droppedFigures[0].weight;
      }

      return state.droppedFigures.reduce(
        (prevVal, currentVal) => prevVal + currentVal.weight,
        0
      );
    },

    getMomentumWeightOfRandomlyPlaced(state) {
      return state.randomlyPlacedFigures[state.randomlyPlacedFigures.length - 1]
        .weight;
    },

    getBoardRotateHeight(state, { getBoardAngle }) {
      return helpers.calculateBoardRotateHeight(
        1000,
        state.fallingFigures[1].positionX,
        getBoardAngle
      );
    },

    getMomentumWeightOfFallingFigure(state) {
      return state.fallingFigures[state.fallingFigures.length - 1].weight;
    },

    droppedFiguresSum(state) {
      return helpers.getMomentum(state.droppedFigures, true);
    },
    randomlyPlacedFiguresSum(state) {
      return helpers.getMomentum(state.randomlyPlacedFigures);
    },

    getBoardAngle(state, { droppedFiguresSum, randomlyPlacedFiguresSum }) {
      let angle = 0;

      if (!droppedFiguresSum) {
        angle = 30;
      } else {
        const subtraction = Math.abs(
          droppedFiguresSum - randomlyPlacedFiguresSum
        );

        angle =
          droppedFiguresSum > randomlyPlacedFiguresSum
            ? (subtraction / droppedFiguresSum) * -50
            : (subtraction / randomlyPlacedFiguresSum) * 50;
      }

      return angle;
    },

    isBoardAngleWithinLimits(state, { getBoardAngle }) {
      return getBoardAngle > -30 && getBoardAngle < 30;
    },
  },
  mutations: {
    createRandomFigure(state, isRandomlyPlacedFigure) {
      const color = helpers.generateRandomColor();
      const weight = helpers.generateRandomNumber(1, 10);
      const shape = helpers.generateRandomFigureShape();
      const positionY = 0;
      const positionX = helpers.generateRandomNumber(0, 45);
      const id = helpers.generateRandomId();
      const figure = { color, weight, shape, positionY, positionX, id };

      if (isRandomlyPlacedFigure) {
        state.randomlyPlacedFigures.push(figure);
      } else {
        state.fallingFigures.unshift(figure);
      }
    },

    clearPlayground(state) {
      state.droppedFigures = [];
      state.fallingFigures = [];
      state.randomlyPlacedFigures = [];
    },

    toggleGameActivity(state) {
      state.isGamePaused = !state.isGamePaused;
    },

    dropCurrentShape(state) {
      state.fallingFigures[1].positionY += 1;
    },

    moveFallingShape(state, key) {
      if (key === "ArrowLeft") {
        // eslint-disable-next-line no-constant-condition
        state.fallingFigures[1].positionX -= 1
          ? state.fallingFigures[1].positionX >= 0
          : state.fallingFigures[1].positionX;
      }
      if (key === "ArrowRight") {
        // eslint-disable-next-line no-constant-condition
        state.fallingFigures[1].positionX += 1
          ? state.fallingFigures[1].positionX <= 45
          : state.fallingFigures[1].positionX;
      }
    },
  },
  actions: {
    initGame({ commit, state }) {
      commit("clearPlayground");

      commit("createRandomFigure");
      commit("createRandomFigure");

      commit("createRandomFigure", true);

      state.isGamePaused = true;
    },

    toggleGame({ commit }) {
      commit("toggleGameActivity");
      commit("dropCurrentShape");
    },

    moveFallingShapeToDropped({ state, commit }) {
      const droppedFigure = state.fallingFigures[1];
      state.fallingFigures.pop();
      state.droppedFigures.push(droppedFigure);

      commit("createRandomFigure");
      if (state.droppedFigures.length > 1) {
        commit("createRandomFigure", true);
      }
    },
  },
});
