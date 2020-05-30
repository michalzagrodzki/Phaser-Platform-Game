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
	}

	create ()
	{
		this.enter = this.input.keyboard.addKey('Enter');
    this.background = this.add.image(0, 0, SKY_KEY);
    this.background.setOrigin(0, 0);

    this.staticText = this.add.bitmapText(8 * 15, 8 * -2, FONT_KEY, 'PHASER', 250).setTint(0xf0d470, 0xf0d470, 0xe2a46f, 0xe2a46f);
    this.staticText = this.add.bitmapText(8 * 30, 8 * 16, FONT_KEY, 'GAME', 200).setTint(0xe2a46f, 0xe2a46f, 0xc74b08, 0xc74b08);
    this.staticText = this.add.bitmapText(8 * 27, 8 * 60, FONT_KEY, '2020 MICHAL ZAGRODZKI', 50);

    this.beginText = this.add.bitmapText(8 * 32, 8 * 45, FONT_KEY, 'PRESS ENTER TO START', 40);
    this.beginText.setInteractive();
    this.beginText.on('pointerup', () => this.changeView() );
    this.enter.on('up', () => { this.changeView() });
	}
}