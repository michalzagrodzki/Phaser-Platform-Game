function createGround (vm) {
  const UPPER_LEVEL = vm.baseLevel - 2;
  const LOWER_LEVEL = vm.baseLevel - 1;
  const LEVEL_WIDTH = vm.levelWidth;

  for (let i = 0; i < LEVEL_WIDTH; i++) {
    const upperGroundType = randomInt(1, 5);
    const lowerGroundType = randomInt(1, 5);
    switch (upperGroundType) {
      case 1:
        insertGround(i, UPPER_LEVEL, 'ground_1', vm);
        break;
      case 2:
        insertGround(i, UPPER_LEVEL, 'ground_2', vm);
        break;
      case 3:
        insertGround(i, UPPER_LEVEL, 'ground_3', vm);
        break;
      case 4:
        insertGround(i, UPPER_LEVEL, 'ground_4', vm);
        break;
      default:
        insertGround(i, UPPER_LEVEL, 'ground_1', vm);
    }

    switch (lowerGroundType) {
      case 1:
        insertGround(i, LOWER_LEVEL, 'ground_5', vm);
        break;
      case 2:
        insertGround(i, LOWER_LEVEL, 'ground_6', vm);
        break;
      case 3:
        insertGround(i, LOWER_LEVEL, 'ground_7', vm);
        break;
      case 4:
        insertGround(i, LOWER_LEVEL, 'ground_8', vm);
        break;
      default:
        insertGround(i, LOWER_LEVEL, 'ground_5', vm);
    }
  }
};

function insertGround (index, level, bitmap, vm) {
  vm.ground.create((32 * index) + 16, (32 * level) + 16, bitmap).setScale(1).refreshBody();
};

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

export {
  createGround,
  randomInt
}