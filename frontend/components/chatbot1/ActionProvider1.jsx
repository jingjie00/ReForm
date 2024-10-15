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

  handleQuestionx() {
    const messages = [
      'Nice! I have already created a template based on your invoice.'
    ];
  
    const delays = [500, 900, 1000, 1400];
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }

  handleQuestionxx() {
    const messages = [
      'Noted. Yes, I tracked, and casted into the database.'
    ];
  
    const delays = [500, 900, 1000, 1400];
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }

  handleQuestionxxx() {
    const messages = [
      'Yes',
      `Generating...`,
      `Here you go. From history, your user seem to favor orange bottle the most, but the price compared to other color is quite high.`,
      `Searching from the news and match with name…​ \nThe uncle roger in your invoice name. actually opened a new restaurant and buy in a lot of stuff. This is a temperory increment​`,
      `Ok, so eliminating this outlier, your product likely have normal trend. However, you may notice your white color product tends to favor by user, about 20%. which you can consider adjust your threshold to refill it.​`,
      `Please find the right-hand side column.​`,
    ];
  
    const delays = [500, 900, 1000, 1400, 1900, 2400];
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }

  handleQuestion() {
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
  
  

  handleQuestion2() {
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
  
  handleQuestion3() {
    const messages = [
      'May you give me something about your stock info​'
    ];
  
    const delays = [500, 900, 1000, 1400];
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }

  handleQuestion4() {
    const messages = [
      'This is the report. You must refill blue bottles as possible. The current stock is only 2​',
    ];
  
    const delays = [500, 900, 1000, 1400];
  
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
