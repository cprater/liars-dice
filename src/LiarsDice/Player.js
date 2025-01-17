import { v4 as uuidv4 } from 'uuid';
const DIE_VALUES = [1, 2, 3, 4, 5, 6];

class Player {
  constructor(props) {
    this.init(props);
  }

  init(props) {
    const { name } = props;

    this.id = uuidv4();
    this.name = name;
    this.dice = this.initDice();
  }

  initDice() {
    const dice = [];

    for (let i = 0; i < 5; i++) {
      dice.push(this.createDie());
    }

    return dice;
  }

  createDie() {
    return {
      uuid: uuidv4(),
      value: this.randomRoll(),
    };
  }

  removeDie() {
    if (this.dice.length > 0) {
      this.dice.pop();
    }
  }

  randomRoll() {
    return DIE_VALUES[Math.floor(Math.random() * Math.floor(DIE_VALUES.length))];
  }

  rollDice() {
    const rolledDice = this.dice.map(die => {
      return {
        ...die,
        value: this.randomRoll(),
      };
    });

    this.dice = rolledDice;
  }
}

export default Player;
