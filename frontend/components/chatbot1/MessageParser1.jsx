class MessageParser1 {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowercase = message.toLowerCase();
    //I have submitted a past invoice sample.​
    if (lowercase.includes("past invoice sample") ) {
      this.actionProvider.handleQuestion1();
    }
    //Okay, I need a system to track all the invoices I generated before. I have uploaded a list.​
    else if (lowercase.includes("all the invoices")) {
      this.actionProvider.handleQuestion2();
    }
    //Good, I want to know how many red color bottles I have sold.​
    else if (lowercase.includes("yellow bottles")) {
      this.actionProvider.handleQuestion3();
    }
    //Okay, I want to create an invoice for MCMC for the purchase of 600 large bottles.​
    else if (lowercase.includes("create an invoice")) {
      this.actionProvider.handleQuestion4();
    }
    //Could you generate a report that tells me what is in high demand and what needs to be restocked?​
    else if (lowercase.includes("high demand")) {
      this.actionProvider.handleQuestion5();
    }
    //Here you go
    else if (lowercase.includes("here you go")) {
      this.actionProvider.handleQuestion6();
    }
    //Could you briefly tell me which products users prefer? I would like a report on that.
    else if (lowercase.includes("products users prefer")) {
      this.actionProvider.handleQuestion7();
    }
  }
}

export default MessageParser1;