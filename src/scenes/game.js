import Phaser from 'phaser'

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
    this.scoreText;
    this.bombs;
    this.gameOver = false;
    this.gameOverText;
    this.gameOverScore;
    this.continueText;
    this.continueKey;
    this.width;
    this.height;
  }
  
  insertGround (index, level, bitmap)
  {
    this.ground.create((32 * index) + 16, (32 * level) + 16, bitmap);
  }
  
  insertPlatform (index, level, bitmap)
  {
    this.platforms.create((32 * index) + 16, (32 * level) + 16, bitmap);
  }

  createGround () {
  
    for (let i = 0; i < 25; i++) {
      const upperGroundType = this.randomInt(1, 5);
      const lowerGroundType = this.randomInt(1, 5);
      console.log('upper ground')
      console.log(upperGroundType)
      console.log('lower ground')
      console.log(lowerGroundType)
      switch (upperGroundType) {
        case 1:
          this.insertGround(i, 17, 'ground_1');
          break;
        case 2:
          this.insertGround(i, 17, 'ground_2');
          break;
        case 3:
          this.insertGround(i, 17, 'ground_3');
          break;
        case 4:
          this.insertGround(i, 17, 'ground_4');
          break;
        default:
          this.insertGround(i, 17, 'ground_1');
      }
  
      switch (lowerGroundType) {
        case 1:
          this.insertGround(i, 18, 'ground_5');
          break;
        case 2:
          this.insertGround(i, 18, 'ground_6');
          break;
        case 3:
          this.insertGround(i, 18, 'ground_7');
          break;
        case 4:
          this.insertGround(i, 18, 'ground_8');
          break;
        default:
          this.insertGround(i, 18, 'ground_5');
      }
    }
  }

  createPlatform (start, length, level) {
    for (let i = start; i < start + length; i++) {
      if (i === start || i === start + length - 1) {
        const endPlatformType = this.randomInt(1, 3)
        switch (endPlatformType) {
          case 1:
            this.insertPlatform(i, level, 'platformEnd');
            break;
          case 2:
            this.insertPlatform(i, level, 'platformEnd_2');
            break;
          default:
            this.insertPlatform(i, level, 'platformEnd');
        }
      } else {
          const platformType = this.randomInt(1, 5)
          switch (platformType) {
            case 1:
              this.insertPlatform(i, level, 'platformMiddle_1');
              break;
            case 2:
              this.insertPlatform(i, level, 'platformMiddle_2');
              break;
            case 3:
              this.insertPlatform(i, level, 'platformMiddle_3');
              break;
            case 4:
              this.insertPlatform(i, level, 'platformMiddle_4');
              break;
            default:
              this.insertPlatform(i, level, 'platformMiddle_1');
          }
      }
    }
  }

  randomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  createPlatforms () {
    const platformsQuantity = this.randomInt(3, 6);
    let platformsArray = []
  
    for (let i = 0; i < platformsQuantity; i++) {
      let platformLength;
      let platformStart;
      let platformLevel
  
      if (i === 0) {
        platformLength = this.randomInt(2, 9);
        platformStart = this.randomInt(0, 24 - platformLength);
        platformLevel = this.randomInt(12, 14);
      } else if (i === 1) {
        const previousLevel = platformsArray[i - 1].level;
        const minDistance = previousLevel - 2;
        const maxDistance = previousLevel - 5;
        platformLevel = this.randomInt(minDistance, maxDistance);
  
        const previousStart = platformsArray[0].start
        
        if (previousStart < 12) {
          platformLength = this.randomInt(2, 9);
          platformStart = this.randomInt(0, 12 - platformLength);
        } else {
          platformLength = this.randomInt(2, 9);
          platformStart = this.randomInt(12, 24 - platformLength);
        }
      } else {
        const previousLevel = platformsArray[i - 1].level;
        platformLength = this.randomInt(2, 9);
        platformStart = this.randomInt(0, 24 - platformLength);
        platformLevel = this.randomInt(previousLevel, 3);
      }
      
      const platformObject = {
        length: platformLength,
        start: platformStart,
        level: platformLevel
      }
      platformsArray.push(platformObject);
  
      this.createPlatform(platformStart, platformLength, platformLevel);
    }
  }

  destroyPlatforms () {
    this.platforms.children.iterate(function (child) {
      child.disableBody(true, true)
    })
  }

	preload()
	{
    this.load.bitmapFont('font', './assets/Font_1.png', './assets/Font_1.xml');
    // this.load.image('grid', helpGrid);
    this.load.image('sky', './assets/BackgroundSky.png');
    this.load.image('background', './assets/Background.png')
    this.load.image('ground_1', './assets/Ground_1.png');
    this.load.image('ground_2', './assets/Ground_2.png');
    this.load.image('ground_3', './assets/Ground_3.png');
    this.load.image('ground_4', './assets/Ground_4.png');
    this.load.image('ground_5', './assets/Ground_5.png');
    this.load.image('ground_6', './assets/Ground_6.png');
    this.load.image('ground_7', './assets/Ground_7.png');
    this.load.image('ground_8', './assets/Ground_8.png');
    this.load.image('platformEnd', './assets/Platform_2.png');
    this.load.image('platformEnd_2', './assets/Platform_7.png');
    this.load.image('platformMiddle_1', './assets/Platform_3.png');
    this.load.image('platformMiddle_2', './assets/Platform_4.png');
    this.load.image('platformMiddle_3', './assets/Platform_5.png');
    this.load.image('platformMiddle_4', './assets/Platform_6.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.image('star', './assets/star.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.width = this.game.config.width;
    this.height = this.game.config.height;
    this.score = 0;
	}

	create()
	{
		this.sky = this.add.image(this.width / 2, this.height / 2, 'sky');
    this.background = this.add.image(this.width / 2, this.height / 2, 'background');
    // this.add.image(this.width / 2, this.height / 2, 'grid');

    this.scoreText = this.add.bitmapText(16, -8 * 4, 'font', 'Score: 0', 60).setTint(0xfbf7dd, 0xfbf7dd, 0xf0da4b, 0xf0da4b);
    this.platforms = this.physics.add.staticGroup();
    this.ground = this.physics.add.staticGroup();

    this.createGround();
    this.createPlatforms();

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.physics.add.collider(this.player, [ this.platforms, this.ground ]);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 12,
      setXY: { x: 16, y: 0, stepX: 64 }
    })

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.15, 0.3));
    });

    this.physics.add.collider(this.stars, [ this.platforms, this.ground ])
    this.physics.add.overlap(this.player, this.stars, collectStar, null, this)

    function collectStar (player, star) {
      star.disableBody(true, true);

      this.score += 10;
      this.scoreText.setText('Score: ' + this.score );

      if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
        });

        console.log('all stars collected')

        console.log(this.platforms)

        this.destroyPlatforms();

        this.createPlatforms();

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
        this.gameOverText = this.add.bitmapText(8 * 22, 8 * 18, 'font', 'GAME OVER', 128);
        this.gameOverScore = this.add.bitmapText(8 * 40, 8 * 36, 'font', 'score: ' + this.score, 64);
        this.continueText = this.add.bitmapText(8 * 24, 8 * 54, 'font', 'press any key to continue', 48);

        this.continue = this.input.keyboard.addKey('Enter');
        this.continue.on('up', () => { this.scene.start('score', { score: this.score }); });
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
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
  
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }
  
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}