
function createPlatforms (vm) {
  const platformsQuantity = randomInt(3, 6);
  let platformsArray = []

  for (let i = 0; i < platformsQuantity; i++) {
    let platformLength;
    let platformStart;
    let platformLevel

    if (i === 0) {
      platformLength = randomInt(2, 9);
      platformStart = randomInt(0, 24 - platformLength);
      platformLevel = randomInt(12, 14);
    } else if (i === 1) {
      const previousLevel = platformsArray[i - 1].level;
      const minDistance = previousLevel - 2;
      const maxDistance = previousLevel - 5;
      platformLevel = randomInt(minDistance, maxDistance);

      const previousStart = platformsArray[0].start
      
      if (previousStart < 12) {
        platformLength = randomInt(2, 9);
        platformStart = randomInt(0, 12 - platformLength);
      } else {
        platformLength = randomInt(2, 9);
        platformStart = randomInt(12, 24 - platformLength);
      }
    } else {
      const previousLevel = platformsArray[i - 1].level;
      platformLength = randomInt(2, 9);
      platformStart = randomInt(0, 24 - platformLength);
      platformLevel = randomInt(previousLevel, 3);
    }
    
    const platformObject = {
      length: platformLength,
      start: platformStart,
      level: platformLevel
    }
    platformsArray.push(platformObject);

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