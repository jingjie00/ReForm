import { createChatBotMessage } from "react-chatbot-kit";

const config1 = {
  botName: "reFORM",
  initialMessages: [
    createChatBotMessage(
      `Hi, to get started, could you provide some ideas for your company’s work? Also, can you submit a sample invoice that you currently have?`),
  ]
}

export default config1;