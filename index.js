import express from "express";
import User from './db.js';
import cors from 'cors';

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://token-launcher-nine.vercel.app',
  'https://token-launcher-rishu-rajs-projects-d80232cf.vercel.app',
  'https://token-launcher-git-main-rishu-rajs-projects-d80232cf.vercel.app'
];

// Handle preflight OPTIONS requests globally
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Use CORS middleware for all other requests
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Your routes
app.post('/api', async (req, res) => {
  const { name, symbol, image } = req.body;
  const description = "Token Description";
  const newUser = await User.create({ name, symbol, description, image });
  res.json({ msg: "created", tokenID: newUser._id });
});

app.get("/metadata/:tokenID", async (req, res) => {
  const TokenID = req.params.tokenID;
  const user = await User.findOne({ _id: TokenID });
  res.json({
    name: user.name,
    symbol: user.symbol,
    description: user.description,
    image: user.image,
  });
});

app.listen(3000);
