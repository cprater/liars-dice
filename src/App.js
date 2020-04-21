import React from 'react';
import './App.css';
import LiarsDice from './LiarsDice/index';
import PlayerBoard from './PlayerBoard';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addPlayer = this.addPlayer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
    this.callBullshit = this.callBullshit.bind(this);
    this.callExactly = this.callExactly.bind(this);

    this.refRulesForm = React.createRef();

    this.state = {
      game: new LiarsDice(),
      evaulationMessage: undefined,
    };
  }

  addPlayer() {
    const {
      game,
    } = this.state;

    game.addPlayer();

    this.setState({ game });
  }

  startGame() {
    const { game } = this.state;

    game.startGame();

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

  submitGuess(formData) {
    const { game } = this.state;

    game.submitPlayerTurn(formData);

    this.setState({ game });
  }

  callBullshit() {
    const { game } = this.state;

    game.callBullshit();

    this.setState({ game });
  }

  callExactly() {
    const { game } = this.state;

    game.callExactly();

    this.setState({ game });
  }

  render() {
    const {
      game: {
        players,
        title,
        gameStarted,
        activePlayerId,
        playerMessage,
        evaluationMessage,
      },
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h2>{title}</h2>
          {!gameStarted && (
            <button onClick={this.addPlayer}>
              Add Player
            </button>
          )}
          {!gameStarted && players.length > 1 && (
            <button onClick={this.startGame}>
              Start Game
            </button>
          )}
          {gameStarted && (
            <>
              <button onClick={this.resetGame}>Reset game</button>
              <button onClick={() => this.rollAllDice()}>roll</button>

              {evaluationMessage && (
                <h3>{evaluationMessage}</h3>
              )}

              {playerMessage && (
                <h3>{playerMessage}</h3>
              )}
            </>
          )}

          <ul>
            {players.map(player => (
              <li key={player.id}>
                <PlayerBoard
                  activePlayer={activePlayerId === player.id}
                  player={player}
                  onRuleSubmit={this.submitGuess}
                  onCallBullshit={this.callBullshit}
                  onCallExactly={this.callExactly}
                />
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
