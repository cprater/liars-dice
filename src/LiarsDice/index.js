import Player from './Player';
import RulesEvaluator from './RulesEvaluator';

const RULES = {
  BULLSHIT: 'bullshit',
  EXACTLY: 'exactly',
};

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
    this.RulesEvaluator = new RulesEvaluator({
      players: this.players
    });
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
    this.evaluationMessage = undefined;
    this.playerMessage = undefined;
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

  penalizePlayer() {
    const playerIndex = this.activePlayerIndex === 0 ?
      this.players.length - 1 : this.activePlayerIndex - 1;

    const player = this.players[playerIndex];

    player.removeDie();

    this.players.forEach(player => {
      if (player.dice.length === 0) {
        this.endGame(player);
      }
    })
  }

  callBullshit(playerId) {
    this.RulesEvaluator.evaluate({
      rule: RulesEvaluator.RULES.BULLSHIT,
      quantity: this.currentRuleQuantity,
      face: this.currentRuleFace,
      callerId: playerId,
    });
  }

  callExactly(playerId) {
    this.RulesEvaluator.evaluate({
      rule: RulesEvaluator.RULES.EXACTLY,
      quantity: this.currentRuleQuantity,
      face: this.currentRuleFace,
      callerId: playerId,
    });
  }

  evaluateRules(assertRule) {
    let currentQuantity = 0;
    let evaluationMessage;
    let penalizePlayer = false;

    this.players.forEach(player => {
      player.dice.forEach(die => {
        if (die.value === this.currentRuleFace) {
          currentQuantity += 1;
        }
      });
    });

    if (assertRule === 'exactly') {
      if (currentQuantity === this.currentRuleQuantity) {
        evaluationMessage = `YES! There are EXACTLY ${this.currentRuleQuantity} ${this.currentRuleFace}'s`;
      } else {
        evaluationMessage = `NO! There are actually ${currentQuantity} ${this.currentRuleFace}'s`;
        penalizePlayer = true;
      }
    } else {
      if (currentQuantity > this.currentRuleQuantity) {
        evaluationMessage = `NOT BULLSHIT! There are more than ${this.currentRuleQuantity} ${this.currentRuleFace}'s`;
      }
      else if (currentQuantity === this.currentRuleQuantity) {
        evaluationMessage = `NOT BULLSHIT! There are exactly ${this.currentRuleQuantity} ${this.currentRuleFace}'s`;
      }
      else {
        evaluationMessage = `BULLSHIT! There are only ${currentQuantity} ${this.currentRuleFace}'s`;
        penalizePlayer = true;
      }
    }

    if (penalizePlayer) {
      this.penalizePlayer();
    }

    this.evaluationMessage = evaluationMessage;
    this.playerMessage = undefined;
  }

  endGame(player) {
    // const player = this.players.find(p => p.id === this.activePlayerId);
    this.playerMessage = `${player} LOSES!`
    this.evaluationMessage = undefined;
  }
}

export default LiarsDice;
