import Phaser from "phaser";

import sceneGame from './scenes/game'
import sceneTitle from './scenes/title'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  pixelArt: true,
  width: window.outerWidth,
  height: window.outerHeight,
  input :{
    activePointers: 3
  },
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
    sceneTitle,
    sceneGame
  ]
};

export default new Phaser.Game(config);