import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene
{
	constructor()
	{
    super({key: 'score'})

    const highscoreObjects = localStorage.getItem('highscore')
    const arrayHighscore = '[' + highscoreObjects + ']'
    this.highscoreTable = JSON.parse(arrayHighscore)
    this.score = undefined;

    this.background
    
    this.staticText
    this.enterKey

    this.inputText = []
    this.inputLength = 0
    this.inputLimit = 3;
  }


  anyKey (event) {
    this.scene.resume('input');
    let code = event.keyCode;
    if (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z) {
      this.pressKey(code)
    }
  }

  pressKey (event) {
    if (this.inputLength < this.inputLimit) {
      const character = Object.keys(Phaser.Input.Keyboard.KeyCodes).find(key => Phaser.Input.Keyboard.KeyCodes[key] === event)
      this.inputText.push(character)
      this.inputLength += 1
      this.scene.run('input', { characters: this.inputText })
    }
  }

  startInputField () {
    this.scene.launch('input', { characters: this.inputText });
    this.scene.pause('input');
  }

  isNewHighscore () {
    if (this.highscoreTable[0] === null) { return false }
    const highScoreTableLength = this.highscoreTable.length
    const lastHighscore = this.highscoreTable[highScoreTableLength - 1]
    return lastHighscore.score < this.score ? true : false;
  }

  saveScore (inputName, inputScore) {
    const name = inputName.join('');
    const storedHighscore = localStorage.getItem('highscore');
    const arrayHighscore = '[' + storedHighscore + ']'
    const parsedHighscore = JSON.parse(arrayHighscore)
    const userScore = {
      score: inputScore,
      name: name
    }

    if (storedHighscore === null) {
      let highscore = []
      const userScoreJSON = JSON.stringify(userScore)
      highscore.push(userScoreJSON)
      for (let i = 0; i < 4; i++) {
        const scoreItem = {
          score: '0',
          name: '...',
        }
        const emptyScoreJSON = JSON.stringify(scoreItem)
        highscore.push(emptyScoreJSON)
      }
      localStorage.setItem('highscore', highscore);
    } else if (storedHighscore !== null) {
      let newHighscore = []
      let baseHighscore = parsedHighscore
      const ofSmallerScore = (index) => { return index.score < userScore.score };
      const newScoreIndex = baseHighscore.findIndex(ofSmallerScore);
      
      if (newScoreIndex >= 0) {
        baseHighscore.splice(newScoreIndex, 0, userScore);
        const trimmedHighscore = baseHighscore.slice(0,5);

        for (let score of trimmedHighscore) {
          const scoreString = JSON.stringify(score)
          newHighscore.push(scoreString)
        }

        localStorage.setItem('highscore', newHighscore);
      }
    }
  }

  preload () 
  {
    this.load.bitmapFont('font', './assets/Font_1.png', './assets/Font_1.xml');
    this.load.image('sky', './assets/BackgroundSky.png');
  }

  create (data) 
  {
    this.score = data.score;
    const changeView = () => {
      this.saveScore(this.inputText, this.score);
      this.scene.start('highscore');
      this.scene.stop('input');
    }
  
    this.enter = this.input.keyboard.addKey('Enter');
    this.enter.on('up', () => { changeView()} );
    this.background = this.add.image(0, 0, 'sky');
    this.background.setOrigin(0, 0);
    
    if (this.isNewHighscore()) {
      this.startInputField();
  
      this.staticText = this.add.bitmapText(8 * 22, 8 * -1, 'font', 'Congratulations', 85 );
      this.staticText = this.add.bitmapText(8 * 18, 8 * 6, 'font', 'You made a highscore', 70 );
      this.staticText = this.add.bitmapText(8 * 44, 8 * 13, 'font', this.score, 80)
      this.staticText = this.add.bitmapText(8 * 18, 8 * 23, 'font', 'Please type your name below:', 50 );
      this.staticText = this.add.bitmapText(8 * 12, 8 * 60, 'font', 'PRESS ENTER BUTTON TO CONTINUE', 55);
  
      this.input.keyboard.on('keyup', this.anyKey, this);
    } else {
      this.staticText = this.add.bitmapText(8 * 34, 8 * 18, 'font', 'YOUR SCORE', 65 );
      this.staticText = this.add.bitmapText(8 * 44, 8 * 26, 'font', this.score, 80);
      this.staticText = this.add.bitmapText(8 * 10, 8 * 40, 'font', 'You have not made a high score', 60 );
      this.staticText = this.add.bitmapText(8 * 22, 8 * 46, 'font', 'Better luck next time!', 60 );
      this.staticText = this.add.bitmapText(8 * 12, 8 * 60, 'font', 'PRESS ENTER BUTTON TO CONTINUE', 55);
    }
  }
}
    