import { createChatBotMessage } from "react-chatbot-kit";

const config1 = {
  botName: "HealthMe",
  initialMessages: [
    createChatBotMessage(
      `Hi, to get started. Give me some ideas for your company work. Can you submit any sample of invoice that you currently have?.`),
  ]
}

export default config1;