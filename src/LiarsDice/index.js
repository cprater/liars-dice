import Player from './Player';

class LiarsDice {
  constructor() {
    this.init();
  }

  init() {
    this.title = 'Liars Dice';
    this.players = [];
    this.maxPlayers = 5;
    this.gameStarted = false;
    this.activePlayerIndex = 0;
    this.activePlayerId = undefined;
    this.playerMessage = undefined;
    this.evaluationMessage = undefined;
    this.currentRuleQuantity = undefined;
    this.currentRuleFace = undefined;
  }

  startGame() {
    this.gameStarted = true;
    this.setActivePlayer(0);
  }

  addPlayer() {
    if (this.players.length === this.maxPlayers) {
      return;
    }

    const player = new Player({
      name: `Player ${this.players.length + 1}`,
    });

    this.players.push(player);
  }

  setActivePlayer(index) {
    const activePlayer = this.players[index];

    if (!activePlayer) throw console.error(`no activePlayer found for index: ${index}`);

    this.activePlayerId = activePlayer.id;
  }

  nextPlayerTurn() {
    this.activePlayerIndex += 1;

    if (this.activePlayerIndex >= this.players.length) {
      this.activePlayerIndex = 0;
    }

    this.setActivePlayer(this.activePlayerIndex);
  }

  rollAllDice() {
    this.players.forEach(player => player.rollDice());
  }

  submitPlayerTurn(config) {
    const {
      ruleQuantity,
      ruleFace,
      playerId,
    } = config;
    const player = this.players.find(p => p.id == playerId);

    this.currentRuleQuantity = Number(ruleQuantity);
    this.currentRuleFace = Number(ruleFace);
    this.playerMessage = `${player.name} thinks there are ${ruleQuantity} ${ruleFace}'s out in play!`;
    this.evaluationMessage = undefined;

    this.nextPlayerTurn();
  }

  callBullshit() {
    this.evaluateRules('bullshit');
  }

  callExactly() {
    this.evaluateRules('exactly');
  }

  evaluateRules(assertRule) {
    let currentQuantity = 0;
    let evaluationMessage;

    this.players.forEach(player => {
      player.dice.forEach(die => {
        if (die.value === this.currentRuleFace) {
          currentQuantity += 1;
        }
      });
    });

    if (assertRule === 'exactly') {
      evaluationMessage = currentQuantity === this.currentRuleQuantity ?
        `YES! There are EXACTLY ${this.currentRuleQuantity} ${this.currentRuleFace}'s` :
        `NO! There are actually ${currentQuantity} ${this.currentRuleFace}'s`
    } else {
      if (currentQuantity > this.currentRuleQuantity) {
        evaluationMessage = `NOT BULLSHIT! There are more than ${this.currentRuleQuantity} ${this.currentRuleFace}'s`;
      }
      else if (currentQuantity === this.currentRuleQuantity) {
        evaluationMessage = `NOT BULLSHIT! There are exactly ${this.currentRuleQuantity} ${this.currentRuleFace}'s`;
      }
      else {
        evaluationMessage = `BULLSHIT! There are only ${currentQuantity} ${this.currentRuleFace}'s`;
      }
    }

    this.evaluationMessage = evaluationMessage;
    this.playerMessage = undefined;
  }
}

export default LiarsDice;
