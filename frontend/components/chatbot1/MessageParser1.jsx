class MessageParser1 {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    if (lowercase.includes("submit") ) {
      this.actionProvider.handleQuestionx();
    } 
    else if (lowercase.includes("excel")) {
      this.actionProvider.handleQuestionxx();
    }else if (lowercase.includes("red")) {
      this.actionProvider.handleQuestion();
    }else if (lowercase.includes("favor")) {
      this.actionProvider.handleQuestionxxx();
    }else if (lowercase.includes("mcmc")) {
      this.actionProvider.handleQuestion2();
    }else if (lowercase.includes("stock")) {
      this.actionProvider.handleQuestion3();
    }else if (lowercase.includes("here")) {
      this.actionProvider.handleQuestion4();
    }
  }
}

export default MessageParser1;