const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('./db-config');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Configure email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Helper: send financial advice
function sendFinancialAdvice(email) {
    const adviceList = [
        "Consider tracking your recurring expenses!",
        "Set aside some savings each month.",
        "Monitor your spending patterns.",
        "Avoid impulse purchases."
    ];
    const advice = adviceList[Math.floor(Math.random() * adviceList.length)];
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Financial Advice',
        text: advice
    });
}

// User registration
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hashedPassword], (err) => {
        if (err) return res.status(400).send("Error registering user");
        res.status(201).send("User registered successfully!");
    });
});

// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(404).send("User not found");
        const user = results[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).send("Invalid credentials");
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        sendFinancialAdvice(email);
        res.json({ token });
    });
});

// Add expense
app.post('/expenses', (req, res) => {
    const { token, description, amount, date } = req.body;
    const userId = jwt.verify(token, process.env.JWT_SECRET).id;
    db.query(`INSERT INTO expenses (user_id, description, amount, date) VALUES (?, ?, ?, ?)`,
        [userId, description, amount, date], (err) => {
            if (err) return res.status(500).send("Error adding expense");
            res.send("Expense added successfully!");
        });
});

// Get user expenses
app.get('/expenses', (req, res) => {
    const userId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET).id;
    db.query(`SELECT * FROM expenses WHERE user_id = ?`, [userId], (err, results) => {
        if (err) return res.status(500).send("Error retrieving expenses");
        res.json(results);
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
