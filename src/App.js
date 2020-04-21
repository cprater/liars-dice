import React from 'react';
import './App.css';
import LiarsDice from './LiarsDice/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addPlayer = this.addPlayer.bind(this);
    this.resetGame = this.resetGame.bind(this);

    this.state = {
      game: new LiarsDice(),
    };
  }

  addPlayer() {
    const {
      game,
    } = this.state;

    game.addPlayer();

    this.setState({ game });
  }

  resetGame() {
    const game = new LiarsDice();

    this.setState({ game });
  }

  rollAllDice(player) {
    const {
      game,
    } = this.state;

    game.rollAllDice();

    this.setState({ game });
  }

  render() {
    const {
      game: {
        players,
        title,
        gameFull,
      },
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h2>{title}</h2>
          <button onClick={() => this.rollAllDice()}>roll</button>
          <button onClick={this.resetGame}> Reset game </button>

          <ul>
            {players.map(player => (
              <li key={player.name}>
                <h3>{player.name}</h3>
                <h4>Dice:</h4>
                {player.dice.map(die => <div key={die.uuid}>{die.value}</div>)}
              </li>
            ))}
          </ul>

          {!gameFull && (
            <button onClick={this.addPlayer}>
              Add Player
            </button>
          )}
        </header>
      </div>
    );
  }
}

export default App;
