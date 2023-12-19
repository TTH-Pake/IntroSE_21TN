import axios from 'axios';

export const askChatbot = async (messages) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/chatbot', { messages });
        return response.data.reply;
    } catch (error) {
        console.error('Error calling chatbot API:', error);
        throw error;
    }
};
