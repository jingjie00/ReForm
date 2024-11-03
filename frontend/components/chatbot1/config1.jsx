import { createChatBotMessage } from "react-chatbot-kit";
import UploadButton1 from "./UploadButton";
import PaymentButton from "../chatbot/PaymentButton";

const config1 = {
  botName: "reFORM",
  initialMessages: [
    createChatBotMessage(
      `Hi, to get started, could you provide some ideas for your company’s work? Also, can you submit a sample invoice that you currently have?`, {widget: "paymentButton"}),
  ],
  widgets: [
    {
      widgetName: "paymentButton",          // Unique name for the widget
      widgetFunc: (props) => <PaymentButton {...props} />, // Render the component
    },
  ],
}

export default config1;