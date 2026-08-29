import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './chatbot.css'; 


const ChatBot = () => {
  useEffect(() => {
    createChat({
      webhookUrl: import.meta.env.VITE_WEBHOOK_URL,
      mode: 'window',
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there! 👋 I am your MNMA support assistant.',
        'How can I help you today?'
      ],
      i18n: {
        en: {
          title: 'MNMA Support',
          subtitle: "Ask us anything, we're here to help.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question...',
        },
      },
    });
  }, []);

  return <div id="n8n-chat"></div>;
};

export default ChatBot; 