function randomLevel (vm, previous, min, max) {
  let minDistance = vm.baseLevel - 7;
  let maxDistance = vm.baseLevel - 5;
  if (previous) {
    minDistance = previous - min;
    maxDistance = previous - max;
  }
  return randomInt(minDistance, maxDistance)
};

function validatePlatformLength (start, length, vm) {
  let vmLength = length;
  const platformSummary = start + length;
  let platformCorrectedLength = undefined;
  console.log('--------')
  console.log('existing values')
  console.log('platform summary: ' + platformSummary)
  console.log('platform width: ' + length)
  console.log(vm.levelWidth)
  if (platformSummary > (vm.levelWidth - 1)) {
    platformCorrectedLength = platformSummary - vm.levelWidth - 1
    console.log('corrected value')
    console.log(platformCorrectedLength)
  }
  if (platformCorrectedLength > 0) {
    console.log('returning corrected value')
    console.log(platformCorrectedLength)
    vmLength = platformCorrectedLength;
    return vmLength;
  } else if (platformCorrectedLength <= 0) {
    console.log('returning value 1')
    console.log(platformCorrectedLength)
    vmLength = 1;
    return vmLength;
  }
  return vmLength;
}

function placePlatforms(level, platformsArray, vm) {
  const MIN_PLATFORMS_QUANTITY = 1;
  const MAX_PLATFORMS_QUANTITY = vm.levelWidth / 4;
  const MIN_PLATFORM_DISTANCE = Math.floor(vm.levelWidth / 3);
  const MAX_PLATFORM_DISTANCE = Math.floor(vm.levelWidth / 2);
  const platformsQuantity = randomInt(MIN_PLATFORMS_QUANTITY, MAX_PLATFORMS_QUANTITY);

  let vmPlatformsArray = platformsArray;
  
  for (let platform = 0; platform < platformsQuantity; platform++) {
    let platformLength = randomInt(3, 5);
    let platformStart;
    let previousLength = 0;

    if (platform > 0) { 
      previousLength = vmPlatformsArray[platform - 1].platformStart + vmPlatformsArray[platform - 1].platformLength 
      platformStart = randomInt(previousLength + MIN_PLATFORM_DISTANCE, previousLength + MAX_PLATFORM_DISTANCE);
      validatePlatformLength(platformStart, platformLength, vm);
    } else {
      platformStart = randomInt(0, 5);
    }

    /*
    console.log('platform level')
    console.log(level)
    console.log('platform values')
    console.log(platformStart)
    console.log(platformLength)
    console.log('platform summary')
    console.log(platformStart + platformLength)
    */
    const platformObject = {
      platformLength: platformLength,
      platformStart: platformStart,
      level: level
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
    drawPlatform(p.platformStart, p.platformLength, p.level, vm )
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