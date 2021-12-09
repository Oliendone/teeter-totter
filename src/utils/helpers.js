const helpers = {
  generateRandomId() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  },

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  generateRandomColor() {
    const r = this.generateRandomNumber(0, 200);
    const g = this.generateRandomNumber(0, 200);
    const b = this.generateRandomNumber(0, 200);
    return `rgb(${r},${g},${b})`;
  },

  generateRandomFigureShape() {
    const figureIndex = this.generateRandomNumber(0, 2);

    const figures = ["triangle", "square", "circle"];

    return figures[figureIndex];
  },

  calculateBoardRotateHeight(boardWidth = 1000, shapePositionX, degree = 0) {
    // board width
    const line = boardWidth;
    // maximum diapason for shape movement
    const shorted = (line / 2 / 100) * 5;
    // calculate available range width for shapes movement
    const num = line / 2 - shorted;
    // calculate distance from board center to dropped shape
    const result = num - (num / 100) * shapePositionX;
    // calculate square root
    const pow = result * result;
    // calculate cos of line degree
    function calculateCos(deg) {
      const rad = (Math.PI / 180) * deg;

      return Math.cos(rad);
    }

    const shapeHeight = 50;
    // calculate final result from starting position of board to curved
    const side =
      Math.sqrt(pow + pow - 2 * pow * calculateCos(degree)).toFixed(1) -
      shapeHeight;

    if (degree < 0) {
      return Math.trunc(side) + 500 - shapeHeight;
    } else {
      return 500 - Math.trunc(side);
    }
  },

  getMomentum(shapes = [], leftSide = false) {
    return shapes.reduce((total, current) => {
      const left = leftSide ? 50 - current.positionX : current.positionX;

      total += current.weight * left;

      return total;
    }, 0);
  },
};

export default helpers;
