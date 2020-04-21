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
}

export default LiarsDice;
