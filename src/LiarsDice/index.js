import Player from './Player';

class LiarsDice {
  constructor() {
    this.init();
  }

  init() {
    this.title = 'Liars Dice';
    this.players = [];
    this.maxPlayers = 5;
    this.gameFull = false;
  }

  addPlayer() {
    if (this.players.length === this.maxPlayers) {
      this.gameFull = true;
      return;
    }

    const player = new Player({
      name: `Player ${this.players.length + 1}`,
    });

    this.players.push(player);

    if (this.players.length === this.maxPlayers) {
      this.gameFull = true;
    }
  }

  rollAllDice() {
    this.players.forEach(player => player.rollDice());
  }

  evaluateRules(config) {
    const {
      ruleQuantity,
      ruleFace,
      assertRule,
    } = config;
    let currentQuantity = 0;

    this.players.forEach(player => {
      player.dice.forEach(die => {
        if (die.value == ruleFace) {
          currentQuantity += 1;
        }
      });
    });

    if (assertRule === 'exactly') {
      return currentQuantity == ruleQuantity ?
        `YES! There are EXACTLY ${ruleQuantity} ${ruleFace}'s` :
        `NO! There are actually ${currentQuantity} ${ruleFace}'s`
    } else {
      if (currentQuantity > ruleQuantity) {
        return `NOT BULLSHIT! There are more than ${ruleQuantity} ${ruleFace}'s`;
      }
      else if (currentQuantity == ruleQuantity) {
        return `NOT BULLSHIT! There are exactly ${ruleQuantity} ${ruleFace}'s`;
      }
      else {
        return `BULLSHIT! There are only ${currentQuantity} ${ruleFace}'s`;
      }
    }
  }
}

export default LiarsDice;
