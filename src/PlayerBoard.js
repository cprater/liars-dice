import React from 'react';
import serializeForm from './formHelpers';


class PlayerBoard extends React.Component {
  constructor(props) {
    super(props);

    this.submitGuess = this.submitGuess.bind(this);

    this.refRulesForm = React.createRef();
  }

  submitGuess(e) {
    e.preventDefault();
    const { onRuleSubmit } = this.props;

    const formData = serializeForm(this.refRulesForm.current);

    onRuleSubmit(formData);
  }

  render() {
    const {
      activePlayer,
      onCallBullshit,
      onCallExactly,
      player: {
        id,
        name,
        dice,
      },
    } = this.props;

    return (
      <>
        <h3>{name}</h3>
        <h4>Dice:</h4>
        {dice.map(die => (
          <span style={{ border: '1px solid white', padding: '5px' }} key={die.uuid}>
            {activePlayer ? die.value : 'X'}
          </span>
        ))}
        {activePlayer && (
          <>
            <form onSubmit={this.submitGuess} ref={this.refRulesForm}>
              <label htmlFor="ruleQuantity"> How many? </label>
              <input name="ruleQuantity" type="text" />
              <label htmlFor="ruleFace"> Of what face? </label>
              <input name="ruleFace" type="text" />
              <input type="submit" value="Counter bet" />

              <div>
                <input type="hidden" name="playerId" value={id} />
              </div>
            </form>

            <button onClick={() => onCallBullshit(id)}>
              Call Bullshit!
            </button>
            <button onClick={() => onCallExactly(id)}>
              Call Exactly!
            </button>
          </>
        )}
      </>
    )
  }
}

export default PlayerBoard;
