import Phaser from "phaser";

import sceneGame from './scenes/game'
import sceneTitle from './scenes/title'
import sceneScore from './scenes/score'
import sceneInput from './scenes/input'
import sceneHighscore from './scenes/highscore'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: window.innerWidth / 2,
  height: window.innerHeight / 2,
  pixelArt: true,
  zoom: 2,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
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