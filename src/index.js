import Phaser from "phaser";

import sceneGame from './scenes/game'
import sceneTitle from './scenes/title'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 608,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [
    sceneTitle,
    sceneGame
  ]
};

export default new Phaser.Game(config);