import { createChatBotMessage } from "react-chatbot-kit";
import UploadButton1 from "./UploadButton";

const config1 = {
  botName: "reFORM",
  initialMessages: [
    createChatBotMessage(
      `Hi, to get started, could you provide some ideas for your company’s work? Also, can you submit a sample invoice that you currently have?`),
  ],

  widgets: [
    {
      widgetName: "uploadButton",
      widgetFunc: (props) => <UploadButton1 {...props} />,
    },
  ],
}

export default config1;