const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Временная "база данных"
let users = {};

app.post('/get_user', (req, res) => {
    const userId = req.body.user_id;
    
    if (!users[userId]) {
        users[userId] = {
            name: `Пользователь ${userId}`,
            points: 0
        };
    }
    
    res.json(users[userId]);
});

app.post('/add_points', (req, res) => {
    const userId = req.body.user_id;
    const points = req.body.points || 1;
    
    if (!users[userId]) {
        users[userId] = { points: 0 };
    }
    
    users[userId].points += points;
    res.json({ new_points: users[userId].points });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});