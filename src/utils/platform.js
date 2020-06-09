function randomLevel (previous, min, max) {
  const minDistance = previous - min;
  const maxDistance = previous - max;
  return randomInt(minDistance, maxDistance)
};

function createPlatforms (vm) {
  const levelsQuantity = randomInt(3, 6);
  
  let platformsArray = []

  console.log('number of cycles')
  console.log(levelsQuantity)

  for (let level = 0; level < levelsQuantity; level++) {
    let platformLength;
    let platformStart;
    let platformLevel;
    let previousLevel;
    if (level > 0) { previousLevel = platformsArray[level - 1].level; }
    
    console.log('previous level')
    console.log(previousLevel)

    switch(level) {
      case 0:
        platformLength = /* randomInt(2, 9);*/ 24;
        platformStart = randomInt(0, 25 - platformLength);
        platformLevel = randomInt(12, 14);
        break;
      case 1:
        platformLevel = randomLevel(previousLevel, 2, 4)
        platformLength = /* randomInt(2, 9);*/ 24;
        platformStart = randomInt(0, 25 - platformLength);
        /* const previousStart = platformsArray[0].start
        
        if (previousStart < 12) {
          platformLength = randomInt(2, 9);
          platformStart = randomInt(0, 12 - platformLength);
        } else {
          platformLength = randomInt(2, 9);
          platformStart = randomInt(12, 24 - platformLength);
        }*/
        break;
      default:
        console.log('cycle')
        console.log(level)
        platformLength = /* randomInt(2, 9);*/ 24;
        platformStart = randomInt(0, 25 - platformLength);
        platformLevel = randomLevel(previousLevel, 2, 4)
    }
    const platformObject = {
      length: platformLength,
      start: platformStart,
      level: platformLevel
    }
    console.log('platform object level:')
    console.log(platformObject.level)
    if (platformObject.level > 2) {
      platformsArray.push(platformObject);
    } else {
      break;
    }
    console.log(platformsArray)
    
    createPlatform(platformStart, platformLength, platformLevel, vm);
  }
  
};

function createPlatform (start, length, level, vm) {
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