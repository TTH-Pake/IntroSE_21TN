import { useState, useEffect, useRef } from "react";
import Chatbot from "../../assets/chatbot.png";
import SendIcon from "../../assets/send.png";
import { askChatbot } from "../../action/chatbotAction";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleToggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const messagesContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Thêm tin nhắn mới vào state
    const newMessage = { text: inputMessage, sender: 'user' };

    setMessages((prevMessages) => {
      // Use a new variable for the updated messages array
      const updatedMessages = [...prevMessages, newMessage];

      // Sử dụng mảng tin nhắn mới để gửi yêu cầu API
      askChatbot(updatedMessages.map(msg => ({ text: msg.text, sender: msg.sender })))
        .then(reply => {
          // Cập nhật tin nhắn trả lời từ API vào state
          setMessages([...updatedMessages, { text: reply, sender: 'bot' }]);
        })
        .catch(error => {
          console.error('Error sending message to the chatbot API:', error);
        });

      setInputMessage('');
      return updatedMessages; // Return the updated messages array
    });
  };



  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ text: 'Chào bạn, bạn cần mình giúp gì?', sender: 'bot' }]);
    }

    setInputMessage('');
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isChatVisible) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [isChatVisible]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-component fixed bottom-10 right-10 z-50">
      <div className="flex justify-center items-center">
        <img
          src={Chatbot}
          alt="Chatbot Trigger"
          className="chatbot-trigger w-16 h-16 cursor-pointer"
          onClick={handleToggleChat}
        />
      </div>
      {isChatVisible && (
        <div className="chat-card bg-gray-100 rounded-md w-96 shadow-lg">
          <div
            ref={messagesContainerRef}
            className="messages-container h-96 p-3 w-full overflow-y-auto"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
              >
                <span
                  className={`inline-block p-2 rounded-md ${message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-black'
                    }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex bg-white p-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tại đây..."
              className="flex-1 outline-none border-none ml-2"
            />
            <button
              onClick={handleSendMessage}
              className="text-black rounded-md mr-2"
            >
              <img src={SendIcon} alt="send" className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;