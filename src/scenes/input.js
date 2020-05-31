import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene
{ 
  constructor ()
	{
    super({key: 'input'})
    
    this.text;
    this.userText;
    this.userInput;
  }

  preload () {
    this.load.bitmapFont('font', './assets/Font_1.png', './assets/Font_1.xml');
  }

  create (data) {
    this.text = this.add.bitmapText(8 * 24, 8 * 29, 'font', 'ABCDEFGHIJ\nKLMNOPQRST\nUVWXYZ', 55);
    this.text.setLetterSpacing(30);
    this.text.setInteractive();

    this.userText = this.add.bitmapText(8 * 42, 8 * 49, 'font', '...', 80)
    this.userText.setLetterSpacing(30);

    if (data.characters) {
      const inputString = data.characters.join('')
      this.userInput = inputString;
    }
  }

  update () {
    if (this.userInput) {
      this.userText.setText(this.userInput);
      this.scene.pause('input');
    } else {
      this.scene.pause('input');
    }
  }
}