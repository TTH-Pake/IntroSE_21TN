const axios = require('axios');

const askChatbot = async (messages) => {
    try {
        const validMessages = messages
            .filter((message) => message.text !== null && typeof message.text === 'string');

        const formattedMessages = validMessages.map((message, index) => ({
            role: message.sender === 'bot' ? 'assistant' : 'user',
            content: message.text,
        }));

        const payload = {
            model: 'gpt-3.5-turbo',
            messages: formattedMessages,
            max_tokens: 100,
        };

        console.log('Request payload:', payload);

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        console.log('API Response:', response.data);

        if (!response.data.choices || response.data.choices.length === 0) {
            console.error('Empty or invalid response from OpenAI API.');
            return null;
        }

        const generatedText = response.data.choices[0].message.content;
        console.log('Generated Text:', generatedText);

        return generatedText;
    } catch (error) {
        console.error('OpenAI API error:', error.message);

        if (error.response) {
            console.error('API Response Status:', error.response.status);
            console.error('API Response Data:', error.response.data);
        }

        throw error;
    }
};

module.exports = { askChatbot };
