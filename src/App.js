import React from 'react';
import './App.css';
import serializeForm from './formHelpers';
import LiarsDice from './LiarsDice/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addPlayer = this.addPlayer.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.evaluateRules = this.evaluateRules.bind(this);

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

  evaluateRules(e) {
    e.preventDefault();

    const {
      game,
    } = this.state;

    const formData = serializeForm(this.refRulesForm.current);
    const evaluationMessage = game.evaluateRules(formData);

    this.setState({
      evaluationMessage,
      game
    });
  }

  render() {
    const {
      evaluationMessage,
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
          {!gameFull && (
            <button onClick={this.addPlayer}>
              Add Player
            </button>
          )}
          <button onClick={() => this.rollAllDice()}>roll</button>
          <button onClick={this.resetGame}> Reset game </button>

          <form onSubmit={this.evaluateRules} ref={this.refRulesForm}>
            <label htmlFor="ruleQuantity"> How many? </label>
            <input name="ruleQuantity" type="text" />
            <label htmlFor="ruleFace"> Of what face? </label>
            <input name="ruleFace" type="text" />

            <fieldset>
              <label htmlFor="assertExactly">
                Exactly!
                <input name="assertRule" type="radio" value="exactly" id="assertExactly" />
              </label>
              <label htmlFor="assertBullshit">
                Bull Shit!
                <input name="assertRule" type="radio" value="bullshit" id="assertBullshit" />
              </label>
            </fieldset>

            <div>
              <input type="submit" />
            </div>
          </form>

          {evaluationMessage && (
            <h3>{evaluationMessage}</h3>
          )}

          <ul>
            {players.map(player => (
              <li key={player.name}>
                <h3>{player.name}</h3>
                <h4>Dice:</h4>
                {player.dice.map(die => <div key={die.uuid}>{die.value}</div>)}
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
