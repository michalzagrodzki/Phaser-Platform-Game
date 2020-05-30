import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene
{ 
  constructor ()
	{
    super({key: 'highscore'})
    
    this.scoreTable
    this.highscoreText
    this.actionButton
    this.titleTextOne
    this.enterKey
    this.background
    this.scoreRow1 = {
      rank: '',
      score: '',
      name: ''
    }
    this.scoreRow2 = {
      rank: '',
      score: '',
      name: ''
    }
    this.scoreRow3 = {
      rank: '',
      score: '',
      name: ''
    }
    this.scoreRow4 = {
      rank: '',
      score: '',
      name: ''
    }
    this.scoreRow5 = {
      rank: '',
      score: '',
      name: ''
    }
    this.highScoreTable = []
    this.distanceTable = [22, 28, 34, 40, 46]
  }

  preload () {
    this.load.bitmapFont('font', './assets/Font_1.png', './assets/Font_1.xml');
    this.load.image('sky', './assets/BackgroundSky.png');
  }

  create () {
    const storedHighscore = localStorage.getItem('highscore');
    const arrayHighscore = JSON.parse("[" + storedHighscore + "]");
    let sortedHighScore = arrayHighscore.sort((a,b) => { b.score - a.score })
    
    for (let score of sortedHighScore) {
      const formatItem = {
        name: '...',
        score: '.......'
      }
      if (score.name !== '' ) { formatItem.name = score.name }
      if (score.score !== "0") { formatItem.score = score.score }
      this.highScoreTable.push(formatItem)
    }

    const changeView = () => {
      this.scene.start('title');
    }

    this.enterKey = this.input.keyboard.addKey('Enter');
    this.background = this.add.image(0, 0, 'sky');
    this.background.setOrigin(0, 0);

    this.titleTextOne = this.add.bitmapText(8 * 18, 8 * 2, 'font', 'Game Leaderboard', 85 );
    this.titleTextOne = this.add.bitmapText(8 * 14, 8 * 16, 'font', 'Rank', 60 );
    this.titleTextOne = this.add.bitmapText(8 * 30, 8 * 16, 'font', 'Score', 60 );
    this.titleTextOne = this.add.bitmapText(8 * 60, 8 * 16, 'font', 'Name', 60 );
    
    for (let i = 0; i < this.highScoreTable.length; i++) {
      const index = (parseInt(i, 10) + 1)
      const rowName = 'scoreRow' + index
      this[rowName].rank = this.add.bitmapText(8 * 18, 8 * this.distanceTable[i], 'font', index, 65)
      this[rowName].score = this.add.bitmapText(8 * 32, 8 * this.distanceTable[i], 'font', this.highScoreTable[i].score, 65)
      this[rowName].name = this.add.bitmapText(8 * 61, 8 * this.distanceTable[i], 'font', this.highScoreTable[i].name, 65)
    }
    
    this.actionButton = this.add.bitmapText(8 * 10, 8 * 58, 'font', 'PRESS ENTER BUTTON TO CONTINUE', 55);
    this.actionButton.setInteractive();
    this.actionButton.on('pointerup', () => changeView());
    this.enterKey.on('up', () => { changeView()} );
  }

  update () {
    
  }
}