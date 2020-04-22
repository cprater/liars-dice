class RulesEvaluator {
  constructor(props) {
    this.init(props);
  }

  init(props) {
    this.players = props.players;
    this.callerId = undefined;
  }

  evaluate(config) {
    const {
      rule,
      quantity,
      face,
      callerId,
    } = config;

    // rule
    // Evaluate rules:
    // - Who called?
    // - Are there penalties?
    //   - What penalties for who?
  }
}

RulesEvaluator.RULES = {
  BULLSHIT: 'bullshit',
  EXACTLY: 'exactly',
};

export default RulesEvaluator;
