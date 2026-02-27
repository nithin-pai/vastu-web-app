const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Basic Vastu Scoring Endpoint
app.post('/api/evaluate-vastu', (req, res) => {
    const { roomType, zone } = req.body;
    
    // Example Logic Engine response
    res.json({
        message: "Vastu check complete",
        room: roomType,
        placedIn: zone,
        status: (zone === 'South-East' && roomType === 'Kitchen') ? 'Excellent' : 'Needs Review'
    });
});

app.listen(PORT, () => {
    console.log(`🧭 Vastu Backend Engine running on http://localhost:${PORT}`);
});
