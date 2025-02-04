// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Route to handle content generation
app.get('/api/generate', async (req, res) => {
    // Retrieve the prompt from the query parameters
    const prompt = req.query.prompt || '';

    try {
        // Make a POST request to the API
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-latest:generateContent?key=AIzaSyAfT0umtfIQ6dIAa5yl9_m02ldHcJMl9Is`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Extract and simplify the API response
        const candidates = response.data.candidates;
        const simplifiedResponse = {};

        if (candidates && candidates.length > 0) {
            const content = candidates[0].content;
            const responseText = content.parts.map(part => part.text).join(' ').trim(); // Join text and trim whitespace
            
            // Construct the user-friendly response
            simplifiedResponse.text = responseText;
            // Optionally include the finish reason
            simplifiedResponse.finishReason = candidates[0].finishReason;
        }

        // Send the simplified response to the client
        res.json(simplifiedResponse);
    } catch (error) {
        // Log the error and send a 500 response to the client
        console.error('Error communicating with the API:', error.message);
        res.status(500).json({ error: 'Error communicating with the API.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});