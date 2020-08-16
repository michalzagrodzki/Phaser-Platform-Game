import Phaser from 'phaser'

import { createGround, randomInt } from '../utils/ground'
import { createPlatforms, destroyPlatforms } from '../utils/platform'
import { createControls } from '../utils/controls'
import { getScore, setScore } from '../utils/score'

export default class GameScene extends Phaser.Scene
{
	constructor()
	{
    super({key: 'game'})

    this.sky;
    this.background;
    this.platforms;
    this.ground;
    this.player;
    this.cursors;
    this.stars;
    this.score;
    this.highscore;
    this.scoreText;
    this.bombs;
    this.gameOver = false;
    this.gameOverText;
    this.gameOverScore;
    this.gameOverPanel;
    this.continueText;
    this.continueKey;
    this.width;
    this.height;
    this.baseLevel;
    this.levelWidth;
    this.spriteSize;
    this.halfSpriteSize;
    this.controlsBaseLevel;
  }
  
	preload()
	{
    this.load.bitmapFont('font', './assets/Font_1.png', './assets/Font_1.xml');
    // this.load.image('grid', helpGrid);
    this.load.image('sky', './assets/skyGrid.png');
    // this.load.image('background', './assets/Background.png')
    this.load.image('ground_1', './assets/Ground_1.png');
    this.load.image('ground_2', './assets/Ground_2.png');
    this.load.image('ground_3', './assets/Ground_3.png');
    this.load.image('ground_4', './assets/Ground_4.png');
    this.load.image('ground_5', './assets/Ground_5.png');
    this.load.image('ground_6', './assets/Ground_6.png');
    this.load.image('ground_7', './assets/Ground_7.png');
    this.load.image('ground_8', './assets/Ground_8.png');
    this.load.image('ground_base', './assets/Ground_B.png');
    this.load.image('platformEnd', './assets/Platform_2.png');
    this.load.image('platformEnd_2', './assets/Platform_7.png');
    this.load.image('platformMiddle_1', './assets/Platform_3.png');
    this.load.image('platformMiddle_2', './assets/Platform_4.png');
    this.load.image('platformMiddle_3', './assets/Platform_5.png');
    this.load.image('platformMiddle_4', './assets/Platform_6.png');
    this.load.image('button_left', './assets/ButtonLeft.png');
    this.load.image('button_right', './assets/ButtonRight.png');
    this.load.image('button_up', './assets/ButtonUp.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.image('star', './assets/star.png');
    this.load.image('gameover', './assets/GameOver.png');
    this.load.image('button_play_again', './assets/ButtonPlayAgain.png');
    this.load.image('button_main_menu', './assets/ButtonMainMenu.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.width = this.game.config.width;
    this.height = this.game.config.height;
    this.spriteSize = 32;
    this.halfSpriteSize = this.spriteSize / 2;
    this.controlSpriteSize = 28;
    this.baseLevel = Math.floor(this.height / this.spriteSize);
    this.levelWidth = Math.ceil(this.width / this.spriteSize);
    this.controlsBaseLevel = this.height - this.controlSpriteSize;
    this.score = 0;
	}

	create()
	{
    this.sky = this.add.image(0, 0, 'sky').setOrigin(0);
    // this.background = this.add.image(this.width / 2, this.height / 2, 'background');
    // this.add.image(this.width / 2, this.height / 2, 'grid');

    this.scoreText = this.add.bitmapText(16, -8 * 4, 'font', '0', 60).setTint(0xfbf7dd, 0xfbf7dd, 0xf0da4b, 0xf0da4b);
    this.platforms = this.physics.add.staticGroup();
    this.ground = this.physics.add.staticGroup();

    createGround(this);
    createPlatforms(this);
    createControls(this);

    const playerPositionX = randomInt(0, this.width);
    const playerPositionY = ((this.baseLevel - 5) * this.spriteSize) + this.halfSpriteSize;
    this.player = this.physics.add.sprite(playerPositionX, playerPositionY, 'dude');
    this.physics.add.collider(this.player, [ this.platforms, this.ground ]);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    const starAmount = Math.ceil(this.levelWidth / 2) - 1;

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: starAmount,
      setXY: { x: this.halfSpriteSize, y: 0, stepX: this.spriteSize * 2 }
    });

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.15, 0.3));
    });

    this.physics.add.collider(this.stars, [ this.platforms, this.ground ])
    this.physics.add.overlap(this.player, this.stars, collectStar, null, this)

    function collectStar (player, star) {
      star.disableBody(true, true);

      this.score += 1;
      this.scoreText.setText(this.score );

      if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
        });

        console.log('all stars collected')

        destroyPlatforms(this);

        createPlatforms(this);

        const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, [ this.platforms, this.ground ]);
    this.physics.add.overlap(this.player, this.bombs, hitBomb, null, this);

    function hitBomb (player, bomb) {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      this.gameOver = true;
      if (this.gameOver === true) {
        getScore(this);
        setScore(this);
        this.gameOverPanel = this.add.image(this.width / 2, this.height / 2, 'gameover');
        this.gameOverScore = this.add.bitmapText((this.width / 2) + 64, (this.height / 2) - 24, 'font', this.highscore, 64);
        this.gameOverScore = this.add.bitmapText((this.width / 2) + 64, (this.height / 2) - 72, 'font', this.score, 64);

        let buttonPlayAgain = this.add.sprite(this.width / 2, (this.height / 2) + 96, 'button_play_again');
        let buttonMainMenu = this.add.sprite(this.width / 2, (this.height / 2) + 170, 'button_main_menu');

        buttonPlayAgain.setInteractive();
        buttonPlayAgain.on('pointerup', () => { 
          this.scene.start('game');
        });
        
        buttonMainMenu.setInteractive();
        buttonMainMenu.on('pointerup', () => { 
          this.scene.start('title');
        });
  
        this.newGame = this.input.keyboard.addKey('Enter');
        this.mainMenu = this.input.keyboard.addKey('Esc');
        this.newGame.on('up', () => { 
          this.scene.start('game');
        });
        this.mainMenu.on('up', () => { 
          this.scene.start('title');
        });
      }
    }

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  
  update () 
  {
    if (this.cursors.left.isDown || this.controls.buttonLeft.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
  
    else if (this.cursors.right.isDown || this.controls.buttonRight.isDown) {
      this.controls.buttonLeft.isDown = false;
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }

    else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }
  
    if ((this.cursors.up.isDown && this.player.body.touching.down) || (this.controls.buttonUp.isDown && this.player.body.touching.down)) {
      this.player.setVelocityY(-330);
    }
  }
}