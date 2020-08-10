import Phaser from 'phaser'

const SKY_KEY = 'sky'
const FONT_KEY = 'font'

export default class GameScene extends Phaser.Scene
{
  
	constructor ()
	{
    super({key: 'title'})
    
    this.enter = undefined
    this.staticText = undefined
    this.background = undefined
  }

  changeView () 
  {
    this.scene.switch('game');
  }


	preload ()
	{
    this.load.bitmapFont(FONT_KEY, './assets/Font_1.png', './assets/Font_1.xml');
    this.load.image(SKY_KEY, './assets/BackgroundSky.png');
    
    this.width = this.game.config.width;
    this.height = this.game.config.height;
	}

	create ()
	{
    this.enter = this.input.keyboard.addKey('Enter');
    const topRectangle = new Phaser.Geom.Rectangle(0, 0, this.width, this.height / 4);
    const topColor = this.add.graphics({ fillStyle: { color: 0x99d1ea } })
    topColor.fillRectShape(topRectangle);

    const bottomRectangle = new Phaser.Geom.Rectangle(0, this.height / 1.2, this.width, this.height / 4);
    const bottomColor = this.add.graphics({ fillStyle: { color: 0xe5f3fa } })
    bottomColor.fillRectShape(bottomRectangle);

    this.bottomRectangle = undefined;
    this.background = this.add.image(this.width / 2, this.height / 2, SKY_KEY);
    this.background.setOrigin(0.5, 0.5);

    this.staticText = this.add.bitmapText(8 * 2, 8 * -2, FONT_KEY, 'GAME', 250).setTint(0xf0d470, 0xf0d470, 0xe2a46f, 0xe2a46f);
    this.staticText = this.add.bitmapText(8 * 8, 8 * 16, FONT_KEY, 'GAME', 200).setTint(0xe2a46f, 0xe2a46f, 0xc74b08, 0xc74b08);
    this.staticText = this.add.bitmapText(8 * 4, this.height / 1.1, FONT_KEY, '2020 MICHAL ZAGRODZKI', 48, 1);

    this.beginText = this.add.bitmapText(8 * 10, this.height / 1.5, FONT_KEY, 'PRESS ENTER TO START', 40);
    this.beginText.setInteractive();
    this.beginText.on('pointerup', () => this.changeView() );
    this.enter.on('up', () => { this.changeView() });
	}
}