function randomLevel (vm, previous, min, max) {
  let minDistance = vm.baseLevel - 7;
  let maxDistance = vm.baseLevel - 5;
  if (previous) {
    minDistance = previous - min;
    maxDistance = previous - max;
  }
  return randomInt(minDistance, maxDistance)
};

function validatePlatformPosition (object, vm) {
  if (object.start > vm.levelWidth) { return object }
  const platformSummary = object.start + object.width;
  let correctPosition = 0;
  if (platformSummary >= (vm.levelWidth - 1)) {
    correctPosition = (platformSummary - vm.levelWidth) + 1
  }
  if (correctPosition > 0) {
    object.start = object.start - correctPosition;
  }
  return object;
}

function placePlatforms(level, platformsArray, vm) {
  const MIN_PLATFORMS_QUANTITY = 1;
  const MAX_PLATFORMS_QUANTITY = vm.levelWidth / 4;
  const MIN_PLATFORM_DISTANCE = Math.floor(vm.levelWidth / 3);
  const MAX_PLATFORM_DISTANCE = Math.floor(vm.levelWidth / 2);
  const platformsQuantity = randomInt(MIN_PLATFORMS_QUANTITY, MAX_PLATFORMS_QUANTITY);

  let vmPlatformsArray = platformsArray;
  
  for (let platform = 0; platform < platformsQuantity; platform++) {
    const platformObject = {
      width: randomInt(3, 5),
      start: 0,
      level: level
    }

    let previousLength = 0;

    if (platform > 0) { 
      previousLength = vmPlatformsArray[platform - 1].start + vmPlatformsArray[platform - 1].width 
      platformObject.start = randomInt(previousLength + MIN_PLATFORM_DISTANCE, previousLength + MAX_PLATFORM_DISTANCE);
      validatePlatformPosition(platformObject, vm);
    } else {
      platformObject.start = randomInt(0, 5);
    }
    
    vmPlatformsArray.push(platformObject);
  }

  return vmPlatformsArray;
}
function createPlatformRows (levelsQuantity, inputArray, vm) {

  let vmPlatformsRows = inputArray;
  let levelsArray = []

  for (let level = 0; level < levelsQuantity; level++) {
    let platformLevel;
    let previousLevel;
    let platformsRow = [];
    if (level > 0) { previousLevel = levelsArray[level - 1]; }

    switch(level) {
      case 0:
        platformLevel = randomLevel(vm);
        levelsArray.push(platformLevel);
        placePlatforms(platformLevel, platformsRow, vm)
        break;
      case 1:
        platformLevel = randomLevel(vm, previousLevel, 2, 4)
        levelsArray.push(platformLevel);
        placePlatforms(platformLevel, platformsRow, vm)
        break;
      default:
        platformLevel = randomLevel(vm, previousLevel, 2, 3)
        levelsArray.push(platformLevel);
        placePlatforms(platformLevel, platformsRow, vm)
    }

    platformsRow.forEach(platform => {
      if (platform.level > 1) { vmPlatformsRows.push(platform); }
    });

  }
  return vmPlatformsRows;
}

function drawPlatforms (inputArray, vm) {
  const vmPlatforms = inputArray;
  vmPlatforms.forEach(p => {
    drawPlatform(p.start, p.width, p.level, vm )
  });
}

function createPlatforms (vm) {
  const minLevelsQuantity = Math.floor(vm.baseLevel / 6); 
  const maxLevelQuantity = Math.floor(vm.baseLevel / 3);
  const levelsQuantity = randomInt(minLevelsQuantity, maxLevelQuantity);
  let platforms = [];
  createPlatformRows(levelsQuantity, platforms, vm);
  drawPlatforms(platforms, vm);
};

function drawPlatform (start, length, level, vm) {
  for (let i = start; i < start + length; i++) {
    if (i === start || i === start + length - 1) {
      const endPlatformType = randomInt(1, 3)
      switch (endPlatformType) {
        case 1:
          insertPlatform(i, level, 'platformEnd', vm);
          break;
        case 2:
          insertPlatform(i, level, 'platformEnd_2', vm);
          break;
        default:
          insertPlatform(i, level, 'platformEnd', vm);
      }
    } else {
        const platformType = randomInt(1, 5)
        switch (platformType) {
          case 1:
            insertPlatform(i, level, 'platformMiddle_1', vm);
            break;
          case 2:
            insertPlatform(i, level, 'platformMiddle_2', vm);
            break;
          case 3:
            insertPlatform(i, level, 'platformMiddle_3', vm);
            break;
          case 4:
            insertPlatform(i, level, 'platformMiddle_4', vm);
            break;
          default:
            insertPlatform(i, level, 'platformMiddle_1', vm);
        }
    }
  }
};

function insertPlatform (index, level, bitmap, vm)
{
  vm.platforms.create((32 * index) + 16, (32 * level) + 16, bitmap);
};


function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function destroyPlatforms (vm) {
  vm.platforms.children.iterate(function (child) {
    child.disableBody(true, true)
  })
};

export {
  createPlatforms,
  destroyPlatforms
}