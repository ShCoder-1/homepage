const GameResultDisplay = document.getElementById('result');
const GameActionFildes = document.getElementsByClassName('action-row');
const ActionBtn = document.getElementsByClassName('click-action');
const WinGame = document.getElementById('win-game-outer');
const BossLevel = document.getElementById('boss-outer');
let GameActions = [];

const GamePhrases = {
  'player': {
    'physical': ['You crash his head', 'You do something', 'You use sword'],
    'magical': ['magical action 1', 'magical action 2', 'magical action 3'],
    'mental': ['mental action 1', 'mental action 2', 'mental action 3'],
  },
  'boss': {
    'nodamage': {
      'physical': ['Boss no physical 1', 'Boss no physical 2', 'Boss no physical 3'],
      'magical': ['Boss no magical 1', 'Boss no magical 2', 'Boss no magical 3'],
      'mental': ['Boss no mental 1', 'Boss no mental 2', 'Boss no mental 3'],
    }, 
    'damaged': ['Oh no 1', 'Oh no 2', 'Oh no 3']
  }
};

console.log(GameActionFildes);

class MainGame {
  
  constructor(startBossLife,damage) {
    this.bossLife = startBossLife;
    this.damage = damage;
    // boss phrases 
    this.nodamage = GamePhrases['boss']['nodamage'];
    this.damaged = GamePhrases['boss']['damaged'];
  }

  act(actionId) {
    const player = actionId;
    const boss = this.setBossAction();

    this.damageBoss(player, boss)
  }

  setBossAction() {
    return this.generateRanomd(GameActions);
  }

  generateRanomd(dataRange) {
    return dataRange[Math.floor(Math.random() * dataRange.length)];     
  }

  damageBoss(playerAction, bossAction) {
    this.displayPhrase(GamePhrases['player'][playerAction], 'player-phrase');
    
    // boss is not damaged
    if (playerAction == bossAction) {
      this.displayPhrase(this.nodamage[bossAction], 'boss-phrase'); 
      this.displayResult('miss!');
      return;
    }    

    // if boss is successfully damaged
    this.bossLife -= this.damage;
    if (this.bossLife === 0 || this.bossLife < 0) {
      this.win();
      return;
    }

    this.displayPhrase(this.damaged, 'boss-phrase');
    this.displayBossLifeStatus();
    this.displayResult('success!');    
  }

  displayPhrase(dataRange, target) {
    let el = document.getElementById(target)
    el.innerText = this.generateRanomd(dataRange);
  }

  displayBossLifeStatus() {
    let el = document.getElementById('boss-life');
    el.style.cssText = 'width: ' + this.bossLife + 'px';
  }

  displayResult(text) {
    GameResultDisplay.innerText = text;
  }
  win() {
    BossLevel.style.cssText = 'display: none;';
    WinGame.classList.remove('hide');
  }

}

// init game
const game = new MainGame(210, 70);

// Handle a player click action
Array.from(GameActionFildes).forEach(action => action.addEventListener('click', e => {
    let actionId = e.target.id;
    
    console.log(actionId);
    
    GameActions.push(actionId);
    game.act(actionId);
  })
)

Array.from(ActionBtn).forEach(action => action.addEventListener('click', e => {

  let hideEl = document.getElementById(e.target.dataset.hide);
    hideEl.style.cssText = 'display: none;';

    let showEl = document.getElementById(e.target.dataset.show);
    showEl.classList.remove('hide');
  })
)