import Phaser from "phaser";

import sceneGame from './scenes/game'
import sceneTitle from './scenes/title'
import sceneScore from './scenes/score'
import sceneInput from './scenes/input'
import sceneHighscore from './scenes/highscore'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  pixelArt: true,
  width: window.outerWidth,
  height: window.outerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT
  },
  scene: [
    // sceneTitle,
    sceneGame,
    sceneScore,
    sceneInput,
    sceneHighscore
  ]
};

export default new Phaser.Game(config);