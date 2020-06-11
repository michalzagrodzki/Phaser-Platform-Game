function randomLevel (previous, min, max) {
  let minDistance = 12
  let maxDistance = 14
  
  if (previous) {
    minDistance = previous - min;
    maxDistance = previous - max;
  }
  return randomInt(minDistance, maxDistance)
};

function placePlatforms(level, platformsArray) {
  const platformsQuantity = randomInt(3, 8);
  let vmPlatformsArray = platformsArray;
  
  for (let platform = 0; platform < platformsQuantity; platform++) {
    let platformLength;
    let platformStart;
    let previousLength = 0;
    if (platform > 0) { 
      console.log('platform start')
      console.log(platformsArray[platform - 1])
      previousLength = platformsArray[platform - 1].platformStart + platformsArray[platform - 1].platformLength 
    }

    console.log(previousLength)
    platformStart = randomInt(previousLength + 1, previousLength + 3);
    platformLength = randomInt(1, 6);
    const platformObject = {
      platformLength: platformLength,
      platformStart: platformStart,
      level: level
    }
    vmPlatformsArray.push(platformObject)
    console.log(vmPlatformsArray)
  }

  return vmPlatformsArray;
}
function createPlatformRows (levelsQuantity, vm) {

  let platformsRowArray = []

  for (let level = 0; level < levelsQuantity; level++) {
    let platformLength;
    let platformStart;
    let platformLevel;
    let previousLevel;
    let platformsArray = [];
    if (level > 0) { previousLevel = platformsRowArray[level - 1].level; }

    switch(level) {
      case 0:
        platformLength = /* randomInt(2, 9);*/ 24;
        platformStart = randomInt(0, 25 - platformLength);
        platformLevel = randomLevel();
        placePlatforms(platformLevel, platformsArray)
        break;
      case 1:
        platformLevel = randomLevel(previousLevel, 2, 4)
        platformLength = /* randomInt(2, 9);*/ 24;
        platformStart = randomInt(0, 25 - platformLength);
        placePlatforms(platformLevel, platformsArray)
        /* const previousStart = platformsRowArray[0].start
        
        if (previousStart < 12) {
          platformLength = randomInt(2, 9);
          platformStart = randomInt(0, 12 - platformLength);
        } else {
          platformLength = randomInt(2, 9);
          platformStart = randomInt(12, 24 - platformLength);
        }*/
        break;
      default:
        platformLength = /* randomInt(2, 9);*/ 24;
        platformStart = randomInt(0, 25 - platformLength);
        platformLevel = randomLevel(previousLevel, 2, 4)
        placePlatforms(platformLevel, platformsArray)
    }
    const platformObject = {
      length: platformLength,
      start: platformStart,
      level: platformLevel
    }
    console.log('array for level:')
    console.log(platformsArray)
    if (platformObject.level > 1) {
      platformsRowArray.push(platformObject);
    } else {
      break;
    }
    drawPlatform(platformStart, platformLength, platformLevel, vm);
  }
}

function createPlatforms (vm) {
  const levelsQuantity = randomInt(3, 6);
  createPlatformRows(levelsQuantity, vm);
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