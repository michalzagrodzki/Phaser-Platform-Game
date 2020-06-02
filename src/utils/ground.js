function createGround (vm) {
  for (let i = 0; i < 25; i++) {
    const upperGroundType = randomInt(1, 5);
    const lowerGroundType = randomInt(1, 5);
    switch (upperGroundType) {
      case 1:
        insertGround(i, 17, 'ground_1', vm);
        break;
      case 2:
        insertGround(i, 17, 'ground_2', vm);
        break;
      case 3:
        insertGround(i, 17, 'ground_3', vm);
        break;
      case 4:
        insertGround(i, 17, 'ground_4', vm);
        break;
      default:
        insertGround(i, 17, 'ground_1', vm);
    }

    switch (lowerGroundType) {
      case 1:
        insertGround(i, 18, 'ground_5', vm);
        break;
      case 2:
        insertGround(i, 18, 'ground_6', vm);
        break;
      case 3:
        insertGround(i, 18, 'ground_7', vm);
        break;
      case 4:
        insertGround(i, 18, 'ground_8', vm);
        break;
      default:
        insertGround(i, 18, 'ground_5', vm);
    }
  }
};

function insertGround (index, level, bitmap, vm) {
  vm.ground.create((32 * index) + 16, (32 * level) + 16, bitmap);
};

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

export {
  createGround
}