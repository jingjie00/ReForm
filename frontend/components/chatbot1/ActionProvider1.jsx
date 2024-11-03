import emailjs from "emailjs-com"

class ActionProvider1 {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  handleQuestion1() {
    const messages = [
      'Nice! I have already created an invoice template for you.'
    ];
  
    const delays = [500, 900, 1000, 1400];
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }

  handleQuestion2() {
    const messages = [
      'Noted. Yes, I have tracked it and casted it to the database.'
    ];
  
    const delays = [500, 900, 1000, 1400];
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }


  handleQuestion3() {
    const messages = [
      'Analysing...',
      `There are only total of 2 red bottles has been sold`,
    ];
  
    const delays = [500, 1200, 1000, 1400];
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }


  handleQuestion4() {
    const messages = [
      { text: 'Record has been updated', options: {} },
      { text: '\n Generating invoice...', options: {} },
      { text: '\n Here is the invoice', options: { widget: "Complete" } },
    ];
  
    const delays = [500, 700, 900, 1400, 4000]; 
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message.text, message.options));
      }, delays[index]);
    });

    emailjs.init("nEOa7brxpEkuoZvpM");
  
  
    emailjs.send("service_dfxu0dm","template_v81ybnd")
    .then(() => console.log("Done"))
    .catch(err => console.error('Failed to send email:', err));
  }


  handleQuestion5() {
    const message = this.createChatBotMessage(
      'Could you provide me with information about your stock?',
      {
        widget: "paymentButton",
      }
    );
    this.updateChatbotState(message);
  }

  handleQuestion6() {
    const messages = [
      'This is the report: you need to refill blue bottles as soon as possible, as the current stock is only 2.​',
    ];
  
    const delays = [500, 900, 1000, 1400];
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }


  handleQuestion7() {
    const messages = [
      'Yes',
      `Generating...`,
      `Here you go. From the history, your user seems to favor orange bottles the most, but the price compared to other colors is quite high.`,
      `Searching through the news and matching with the name…\nThe Uncle Roger in your invoice actually opened a new restaurant and purchased a lot of supplies. This is a temporary increase.​`,
      `Okay, by eliminating this outlier, your product likely has a normal trend. However, you may notice that your white-colored product tends to be favored by users, by about 20%. You may want to consider adjusting your threshold to refill it.​`,
      `Please find the right-hand side column.​`,
    ];
  
    const delays = [500, 900, 1000, 1400, 1900, 2400];
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }

  handleEnd() {
    this.updateChatbotState(this.createChatBotMessage(
      'Processing completed',
    ));
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider1;
