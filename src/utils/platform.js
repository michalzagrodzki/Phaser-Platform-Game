function randomLevel (vm, previous, min, max) {
  let minDistance = 12
  let maxDistance = 14
  
  if (previous) {
    minDistance = previous - min;
    maxDistance = previous - max;
  }
  return randomInt(minDistance, maxDistance)
};

function placePlatforms(level, platformsArray) {
  const platformsQuantity = randomInt(2, 5);
  let vmPlatformsArray = platformsArray;
  
  for (let platform = 0; platform < platformsQuantity; platform++) {
    let platformLength = randomInt(3, 5);
    let platformStart;
    let previousLength = 0;

    if (platform > 0) { 
      previousLength = vmPlatformsArray[platform - 1].platformStart + vmPlatformsArray[platform - 1].platformLength 
      platformStart = randomInt(previousLength + 4, previousLength + 7);
    } else {
      platformStart = randomInt(0, 5);
    }

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

  let vmPlatforms = inputArray;
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
        placePlatforms(platformLevel, platformsRow)
        break;
      case 1:
        platformLevel = randomLevel(vm, previousLevel, 2, 4)
        levelsArray.push(platformLevel);
        placePlatforms(platformLevel, platformsRow)
        break;
      default:
        platformLevel = randomLevel(vm, previousLevel, 2, 3)
        levelsArray.push(platformLevel);
        placePlatforms(platformLevel, platformsRow)
    }

    platformsRow.forEach(platform => {
      if (platform.level > 1) { vmPlatforms.push(platform); }
    });

  }
  return vmPlatforms;
}

function drawPlatforms (inputArray, vm) {
  const vmPlatforms = inputArray;
  vmPlatforms.forEach(p => {
    drawPlatform(p.platformStart, p.platformLength, p.level, vm )
  });
}

function createPlatforms (vm) {
  const levelsQuantity = randomInt(3, 6);
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