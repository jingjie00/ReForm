import { callApi } from "../helper/localStorageHelpers";
import axios from 'axios';


class MessageParser1 {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

 async parse(message) {
    const lowercase = message.toLowerCase();
    //I have submitted a past invoice sample.​
    if (lowercase.includes("I have submitted a past invoice sample") ) {
      this.actionProvider.handleQuestion1();
    }
    //Okay, I need a system to track all the invoices I generated before. I have uploaded a list.​
    else if (lowercase.includes(" I need a system to track all the invoices")) {
      this.actionProvider.handleQuestion2();
    }
    //Good, I want to know how many red color bottles I have sold.​
    else if (lowercase.includes("yellow bottles")) {
      this.actionProvider.handleQuestion3();
    }
    //Okay, I want to create an invoice for MCMC for the purchase of 600 large bottles.​
    else if (lowercase.includes("I want to create an invoice for MCMC")) {
      this.actionProvider.handleQuestion4();
    }
    //Could you generate a report that tells me what is in high demand and what needs to be restocked?​
    else if (lowercase.includes("you generate a report that tells me what is in high demand")) {
      this.actionProvider.handleQuestion5();
    }
    //Here is the stock summary.
    else if (lowercase.includes("Here is the stock summary")) {
      this.actionProvider.handleQuestion6();
    }
    //Could you briefly tell me which products users prefer? I would like a report on that.
    else if (lowercase.includes("products users prefer")) {
      this.actionProvider.handleQuestion7();
    }else{
     this.actionProvider.handleLoading();
     try {
      const res = await axios.post(
        `https://api.sambanova.ai/v1/chat/completions`,
        {
          model: 'Meta-Llama-3.1-8B-Instruct',
          messages: [
            { role: 'system', content: 'You are the chatbot for a website selling plastic containers, such as bottles. Respond in this context. You may integrate news and address user queries.' },
            { role: 'user', content: 'How many bottles are there?' }
          ],
          temperature: 0.1,
          top_p: 0.1
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 0cc39982-4848-46ca-959b-ef7dcbbed829`
          },
          timeout: 10000 // 10 seconds timeout in milliseconds
        }
      );
    
      // Set the API response
      let result = res.data.choices[0].message.content;
      this.actionProvider.handleOther(result);
    
    } catch (err) {
      console.error('API call error:', err.message);
      let result = 'Sorry, Please try again. Kindly check your internet connection or API configuration.';
      this.actionProvider.handleOther(result);
    }

    }
  }
}

export default MessageParser1;