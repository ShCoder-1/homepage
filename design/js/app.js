const GameResultDisplay = document.getElementById('result');
const GameActionFildes = document.getElementsByClassName('action-row');
const ActionBtn = document.getElementsByClassName('click-action');
const WinGame = document.getElementById('win-game-outer');
const BossLevel = document.getElementById('boss-outer');
let GameActions = [];

const GamePhrases = {
  'player': {
    'physical': ['You make a sharp lunge', 'Oh, your face hit my heel!', 'Your sword cuts his body'],
    'magical': ['Avacado Kedavra!', 'You impale him with your lightning', 'Fireball burns his eyebrow'],
    'mental': ['Can I talk to you about the gods?', 'You teach him good manners', 'You spit in his face'],
  },
  'boss': {
    'nodamage': {
      'physical': ['The mosquito bites even more painfully!', 'I will crush you like an ant!', 'Oh, how painful (sarcasm)!'],
      'magical': ['Ha, snowflake man!', 'Your magic is as pathetic as you!', 'Are you sure you are a mage?'],
      'mental': ['What do you know about life!', 'You are pathetic!', 'Ha! Is that all you can?'],
    }, 
    'damaged': ['Why are you doing it?', 'That hurts...', 'Oh no, not in my eye!']
  }
};

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