const express = require('express');
const router = express.Router();
const chatbotController = require('../controller/chatbot');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        console.log('Received messages:', req.body.messages);

        const reply = await chatbotController.askChatbot(req.body.messages);

        console.log('Response from askChatbot:', reply);

        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
